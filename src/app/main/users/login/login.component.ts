import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { VgsApiService } from 'src/app/services/api/vgs-api.service';
import { ToastService } from 'src/app/services/axuliary/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  userLogin!: User;

  constructor(
    private fromBuilder: FormBuilder,
    private loginService: VgsApiService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.loginForm = this.fromBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  login() {
    if (this.loginForm.valid) {
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
}
