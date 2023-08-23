import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { User } from 'src/app/models/user.model';
import { VgsApiService } from 'src/app/services/api/vgs-api.service';
import { ToastService } from 'src/app/services/auxiliary/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  userLogin!: User;
  isIframe = false;
  loginDisplay = false;

  constructor(
    private fromBuilder: FormBuilder,
    private loginService: VgsApiService,
    private toastService: ToastService,
    private router: Router,
    private msalAuthService: MsalService
  ) {
    this.loginForm = this.fromBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.isIframe = window !== window.parent && !window.opener;
  }

  login() {
    if (this.loginForm.valid) {
      //# Normal Login
      this.userLogin = this.loginForm.value;
      this.loginService.loginUser(this.userLogin.email).subscribe({
        next: (res) => {
          this.toastService.showToast(
            ToastService.SUCCESS,
            'Successful Login',
            `Welcome ${res.body.alias}`
          );
        },
        error: (error) => {
          this.toastService.showToast(ToastService.ERROR, 'Error', error.error);
        },
        complete: () => {
          //this.router.navigate(['/']);
        },
      });
    }
  }

  msalLogin() {
    //# Msal Login
    this.msalAuthService.loginPopup().subscribe({
      next: (result) => {
        console.log(result);
        this.setLoginDisplay();
      },
      error: (error) => {
        console.log(error);
        //this.toastService.showToast(ToastService.ERROR, 'Login Error', error);
      },
    });
  }

  setLoginDisplay() {
    this.loginDisplay =
      this.msalAuthService.instance.getAllAccounts().length > 0;
  }
}
