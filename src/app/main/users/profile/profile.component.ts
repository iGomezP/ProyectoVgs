import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { faIdBadge, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  faIcons = {
    faIdBadge: faIdBadge,
    faAddressBook: faAddressBook,
  };
  userProfile: User = {
    alias: '',
    email: '',
  };

  constructor(private authService: MsalService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    const activeAccount = this.authService.instance.getActiveAccount();
    const userName = activeAccount?.name;
    const userClaims = activeAccount?.idTokenClaims;
    console.log(userName);
    console.log(userClaims?.emails?.[0] ?? 'default value');

    if (activeAccount && userName && userClaims) {
      this.userProfile.alias = userName;
      this.userProfile.email = userClaims?.emails?.[0] ?? '';
    } else {
      console.log('No user');
    }
  }
}
