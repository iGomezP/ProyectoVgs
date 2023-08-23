import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { HealthCheckComponent } from './main/health-check/health-check.component';
import { LoginComponent } from './main/users/login/login.component';
import { RegisterComponent } from './main/users/register/register.component';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ProfileComponent } from './main/users/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'health', component: HealthCheckComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [MsalGuard] },
  { path: '**', component: NotFoundComponent },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? 'enabledNonBlocking'
          : 'disabled', // Set to enabledBlocking to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
