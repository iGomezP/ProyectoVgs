import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './main/main.module';
import {
  BrowserCacheLocation,
  IPublicClientApplication,
  InteractionType,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';

import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptor,
  MsalModule,
  MsalRedirectComponent,
  MsalService,
} from '@azure/msal-angular';
import {
  protectedResources,
  msalConfig,
  b2cPolicies,
} from './config/msalAuth.config';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    MainModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: 'bc89304e-167f-482e-8344-9faceecb5b95', // This is the ONLY mandatory field that you need to supply.
          authority: b2cPolicies.authorities.signUpSignIn.authority, // Defaults to "https://login.microsoftonline.com/common"
          knownAuthorities: [b2cPolicies.authorityDomain],
          redirectUri: environment.urlHost, // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
          // postLogoutRedirectUri: 'http://localhost:4200', // Indicates the page to navigate after logout.
          // navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
        },
        cache: {
          cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
          storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
        },
        system: {
          loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
              console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false,
          },
        },
      }),
      {
        interactionType: InteractionType.Popup,
        authRequest: {
          scopes: [],
        },
      },
      {
        interactionType: InteractionType.Popup,
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/me', ['user.read']],
        ]),
      }
    ),
  ],
  providers: [MessageService, MsalGuard],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {
  constructor(private primeConfig: PrimeNGConfig) {
    this.primeConfig.ripple = true;
  }
}
