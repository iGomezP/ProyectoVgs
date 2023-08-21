import { compileNgModule } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserRegister } from 'src/app/models/registerUser.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  newUser: UserRegister = {
    email: '',
    password: '',
  };
  registerStatus: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  register() {
    this.registerStatus = true;
  }
}
