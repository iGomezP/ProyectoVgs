import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  fa0,
  fa1,
  fa4,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-failed',
  templateUrl: './login-failed.component.html',
  styleUrls: ['./login-failed.component.scss'],
})
export class LoginFailedComponent implements OnInit {
  faIcons = {
    one: fa1,
    zero: fa0,
    four: fa4,
    exclamation: faExclamation,
  };

  constructor(private router: Router) {}
  redirectPage() {
    setTimeout(() => {
      this.router.navigate(['']);
    }, 5000);
  }

  ngOnInit(): void {
    this.redirectPage();
  }
}
