import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userProfile!: User;

  constructor(private authService: MsalService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    const user = this.authService.instance.getActiveAccount();
    if (user) {
      console.log(user);
    } else {
      console.log('No user');
    }
  }
}
