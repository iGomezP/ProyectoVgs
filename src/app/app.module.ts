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
  InteractionType,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';

import {
  MSAL_BROADCAST_CONFIG,
  MsalBroadcastService,
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalRedirectComponent,
  MsalService,
} from '@azure/msal-angular';
import { b2cPolicies, msalConfig } from './config/msalAuth.config';
import { environment } from 'src/environments/environment';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    MainModule,
    ButtonModule,
    SidebarModule,
    FontAwesomeModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: 'bc89304e-167f-482e-8344-9faceecb5b95', // This is the ONLY mandatory field that you need to supply.
          authority: b2cPolicies.authorities.signUpSignIn.authority, // Defaults to "https://login.microsoftonline.com/common"
          knownAuthorities: [b2cPolicies.authorityDomain],
          redirectUri: environment.urlHost, // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
          postLogoutRedirectUri: environment.urlHost, // Indicates the page to navigate after logout.
          // navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
        },
        cache: {
          cacheLocation: BrowserCacheLocation.SessionStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
          storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
        },
        system: {
          allowNativeBroker: true,
          loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
              //console.log(message);
            },
            logLevel: LogLevel.Trace,
            piiLoggingEnabled: false,
          },
        },
      }),
      {
        interactionType: InteractionType.Redirect, // MSAL Guard Configuration
        loginFailedRoute: '/login-failed',
      },
      {
        interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/me', ['User.Read', 'profile']],
        ]),
      }
    ),
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_BROADCAST_CONFIG,
      useValue: {
        eventsToReplay: 2,
      },
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {
  constructor(private primeConfig: PrimeNGConfig) {
    this.primeConfig.ripple = true;
  }
}
