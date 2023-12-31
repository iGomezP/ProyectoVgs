import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { HealthCheckComponent } from './main/health-check/health-check.component';
import { LoginComponent } from './main/users/login/login.component';
import { RegisterComponent } from './main/users/register/register.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ProfileComponent } from './main/users/profile/profile.component';
import { BrowserUtils } from '@azure/msal-browser';
import { MsalGuard } from '@azure/msal-angular';
import { LoginFailedComponent } from './shared/components/login-failed/login-failed.component';
import { GamesComponent } from './main/games/games/games.component';
import { GameCardComponent } from './main/games/game-card/game-card.component';

const routes: Routes = [
  { path: '', component: GamesComponent },
  { path: 'game-details/:slug', component: GameCardComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [MsalGuard] },
  { path: 'login-failed', component: LoginFailedComponent },
  { path: '**', component: NotFoundComponent },
];

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
