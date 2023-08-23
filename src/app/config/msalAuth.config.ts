import {
  BrowserCacheLocation,
  Configuration,
  LogLevel,
} from '@azure/msal-browser';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export const b2cPolicies = {
  names: {
    signUpSignIn: 'b2c_1_susi',
    resetPassword: 'b2c_1_reset_password',
    editProfile: 'b2c_1_edit_profile',
  },
  authorities: {
    signUpSignIn: {
      authority: 'https://VgApp.b2clogin.com/VgApp.onmicrosoft.com/b2c_1_susi',
    },
    resetPassword: {
      authority:
        'https://VgApp.b2clogin.com/VgApp.onmicrosoft.com/b2c_1_reset_password',
    },
    editProfile: {
      authority:
        'https://VgApp.b2clogin.com/VgApp.onmicrosoft.com/b2c_1_edit_profile',
    },
  },
  authorityDomain: 'VgApp.b2clogin.com',
};

export const msalConfig: Configuration = {
  auth: {
    clientId: '6b8abece-3842-40a7-8e30-b699b73a0bae', // This is the ONLY mandatory field that you need to supply.
    authority: b2cPolicies.authorities.signUpSignIn.authority, // Defaults to "https://login.microsoftonline.com/common"
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: '/', // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
    // postLogoutRedirectUri: 'http://localhost:4200', // Indicates the page to navigate after logout.
    // navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
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
};

export const protectedResources = {
  vgsApi: {
    endpoint: 'https://vgsapinacho.azurewebsites.net/',
    scopes: [
      'https://VgApp.onmicrosoft.com/vgs-api/vgs.read',
      'https://VgApp.onmicrosoft.com/vgs-api/vgs.write',
    ],
  },
};

export const loginRequest = {
  scopes: [],
};

export const silentRequest = {
  scopes: [],
  loginHint: 'example@domain.net',
};
