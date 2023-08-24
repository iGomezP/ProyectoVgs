import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionStatus,
  PopupRequest,
  RedirectRequest,
  EventMessage,
  EventType,
  InteractionType,
  AccountInfo,
  SsoSilentRequest,
  IdTokenClaims,
  PromptValue,
} from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {
  faCartShopping,
  faCircleXmark,
  faRightToBracket,
  faRightFromBracket,
  faUserPlus,
  faUserPen,
} from '@fortawesome/free-solid-svg-icons';
import { b2cPolicies } from 'src/app/config/msalAuth.config';
import { CookieService } from 'ngx-cookie-service';

type IdTokenClaimsWithPolicyId = IdTokenClaims & {
  acr?: string;
  tfp?: string;
};

@Component({
  selector: 'app-user-buttons',
  templateUrl: './user-buttons.component.html',
  styleUrls: ['./user-buttons.component.scss'],
})
export class UserButtonsComponent implements OnInit, OnDestroy {
  faIcons = {
    close: faCircleXmark,
    userLogin: faRightToBracket,
    userLogout: faRightFromBracket,
    userRegister: faUserPlus,
    userEdit: faUserPen,
    cart: faCartShopping,
  };
  sidebarUser: boolean = false;
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    this.setLoginDisplay();

    this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        )
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          this.setLoginDisplay();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.LOGIN_SUCCESS ||
            msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
            msg.eventType === EventType.SSO_SILENT_SUCCESS
        ),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        let payload = result.payload as AuthenticationResult;
        let idtoken = payload.idTokenClaims as IdTokenClaimsWithPolicyId;

        console.log('payload', payload);
        console.log('idtoken', idtoken);

        if (
          idtoken.acr === b2cPolicies.names.signUpSignIn ||
          idtoken.tfp === b2cPolicies.names.signUpSignIn
        ) {
          this.authService.instance.setActiveAccount(payload.account);
        }
        /**
         * For the purpose of setting an active account for UI update, we want to consider only the auth response resulting
         * from SUSI flow. "acr" claim in the id token tells us the policy (NOTE: newer policies may use the "tfp" claim instead).
         * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
         */
        if (
          idtoken.acr === b2cPolicies.names.editProfile ||
          idtoken.tfp === b2cPolicies.names.editProfile
        ) {
          // retrieve the account from initial sing-in to the app
          const originalSignAccount = this.authService.instance
            .getAllAccounts()
            .find(
              (account: AccountInfo) =>
                account.idTokenClaims?.oid === idtoken.oid &&
                account.idTokenClaims?.sub === idtoken.sub &&
                ((account.idTokenClaims as IdTokenClaimsWithPolicyId).acr ===
                  b2cPolicies.names.signUpSignIn ||
                  (account.idTokenClaims as IdTokenClaimsWithPolicyId).tfp ===
                    b2cPolicies.names.signUpSignIn),
              takeUntil(this._destroying$)
            );

          let signUpSignInFlowRequest: SsoSilentRequest = {
            authority: b2cPolicies.authorities.signUpSignIn.authority,
            account: originalSignAccount,
          };

          // silently login again with the signUpSignIn policy
          this.authService.ssoSilent(signUpSignInFlowRequest);
        }

        /**
         * Below we are checking if the user is returning from the reset password flow.
         * If so, we will ask the user to reauthenticate with their new password.
         * If you do not want this behavior and prefer your users to stay signed in instead,
         * you can replace the code below with the same pattern used for handling the return from
         * profile edit flow (see above ln. 74-92).
         */
        if (
          idtoken.acr === b2cPolicies.names.resetPassword ||
          idtoken.tfp === b2cPolicies.names.resetPassword
        ) {
          let signUpsignInFlowRequest: RedirectRequest | PopupRequest = {
            authority: b2cPolicies.authorities.signUpSignIn.authority,
            prompt: PromptValue.LOGIN, // force user to reauthenticate with their new password
            scopes: [],
          };

          this.login(signUpsignInFlowRequest);
        }

        return result;
      });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.LOGIN_FAILURE ||
            msg.eventType === EventType.ACQUIRE_TOKEN_FAILURE
        ),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
        // Checking for the forgot password error. Learn more about B2C error codes at
        // https://learn.microsoft.com/azure/active-directory-b2c/error-codes
        if (result.error && result.error.message.indexOf('AADB2C90118') > -1) {
          let resetPasswordFlowRequest: RedirectRequest | PopupRequest = {
            authority: b2cPolicies.authorities.resetPassword.authority,
            scopes: [],
          };
          this.login(resetPasswordFlowRequest);
        }
      });
  }

  async setLoginDisplay() {
    //await this.authService.instance.handleRedirectPromise();
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  async checkAndSetActiveAccount() {
    await this.authService.instance.handleRedirectPromise();
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount) {
      localStorage.clear();
      sessionStorage.clear();
      this.cookieService.deleteAll();
    }

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();

      // add your code for handling multiple accounts here
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  async loginRedirect() {
    await this.authService.instance.loginRedirect();
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  async login(userFlowRequest?: RedirectRequest | PopupRequest) {
    // const request = { scopes: ['openid', 'profile'] };
    // const token = await this.authService.instance.loginPopup();
    // const res = await this.authService.instance.acquireTokenPopup(request);
    // console.log(token);
    // console.log(res);
    // await this.authService.instance.loginRedirect();
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService
          .loginPopup({
            ...this.msalGuardConfig.authRequest,
            ...userFlowRequest,
          } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      } else {
        this.authService
          .loginPopup(userFlowRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({
          ...this.msalGuardConfig.authRequest,
          ...userFlowRequest,
        } as RedirectRequest);
      } else {
        this.authService.loginRedirect(userFlowRequest);
      }
    }
  }

  async logout() {
    await this.authService.instance.loginPopup();
    await this.authService.instance.logoutRedirect();
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  async editProfile() {
    let editProfileFlowRequest: RedirectRequest | PopupRequest = {
      authority: b2cPolicies.authorities.editProfile.authority,
      scopes: [],
    };
    await this.login(editProfileFlowRequest);
  }

  // unsubscribe to events when component is destroyed
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
