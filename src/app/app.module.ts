import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './main/main.module';
import {
  MsalModule,
  MsalService,
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalRedirectComponent,
} from '@azure/msal-angular';
import {
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
} from '@azure/msal-browser';

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
        // MSAL Configuration
        auth: {
          clientId: '91221174-771e-445c-9713-1f7ae3127ec9',
          authority: 'https://login.microsoftonline.com/common/',
          redirectUri: 'https://vgsapp.azurewebsites.net/',
          postLogoutRedirectUri: 'https://vgsapp.azurewebsites.net/',
        },
        cache: {
          cacheLocation: BrowserCacheLocation.LocalStorage,
          storeAuthStateInCookie: true, // set to true for IE 11
        },
        system: {
          loggerOptions: {
            loggerCallback: () => {},
            piiLoggingEnabled: false,
          },
        },
      }),
      {
        interactionType: InteractionType.Redirect, // MSAL Guard Configuration
      },
      {
        interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com', ['user.read']],
          [
            'https://vgsapinacho.azurewebsites.net/api/user',
            ['customscope.read'],
          ],
          ['https://vgsapp.azurewebsites.net/', null],
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
