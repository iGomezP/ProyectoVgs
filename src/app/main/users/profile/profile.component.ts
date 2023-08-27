import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { faIdBadge, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { IPeople } from 'src/app/models/people.model';
import { IUser } from 'src/app/models/user.model';

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
  private activeAccount!: any;
  peopleInfo: IPeople = {
    firstName: '',
    lastName: '',
    city: '',
    countryId: '',
    postalCode: '',
    state: '',
    streetAddress: '',
  };
  userProfile: IUser = {
    alias: '',
    email: '',
  };

  constructor(private authService: MsalService) {}

  ngOnInit(): void {
    this.activeAccount = this.getActiveAccount();
    if (this.activeAccount) {
      this.getBasicInfo(this.activeAccount);
      this.getAddressInfo(this.activeAccount);
    } else {
      console.log('No user');
    }
  }

  getActiveAccount(): AccountInfo | undefined {
    const activeAccount = this.authService.instance.getActiveAccount();
    if (activeAccount) return activeAccount;
    return undefined;
  }

  getBasicInfo(activeAccount: AccountInfo) {
    const userAlias = activeAccount?.name;
    const userEmail = activeAccount?.idTokenClaims?.emails![0];
    this.userProfile.alias = userAlias;
    this.userProfile.email = userEmail;
    //console.log('UserInfo', this.userProfile);
  }

  getAddressInfo(activeAccount: AccountInfo) {
    const userClaims = activeAccount?.idTokenClaims;
    if (userClaims) {
      this.peopleInfo = {
        firstName: userClaims['given_name'] as string,
        lastName: userClaims['family_name'] as string,
        city: userClaims['city'] as string,
        countryId: userClaims['country'] as string,
        postalCode: userClaims['postalCode'] as string,
        state: userClaims['state'] as string,
        streetAddress: userClaims['streetAddress'] as string,
      };
    }
    //console.log('PeopleInfo', this.peopleInfo);
  }
}
