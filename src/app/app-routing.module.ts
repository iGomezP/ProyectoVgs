import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { HealthCheckComponent } from './main/health-check/health-check.component';
import { LoginComponent } from './main/users/login/login.component';
import { RegisterComponent } from './main/users/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'health', component: HealthCheckComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
