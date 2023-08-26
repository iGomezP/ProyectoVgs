import { Component, Input } from '@angular/core';
import {
  faDiceD20,
  faDragon,
  faScroll,
} from '@fortawesome/free-solid-svg-icons';
import { IPeople } from 'src/app/models/people.model';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/msal/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  faIcons = {
    dragon: faDragon,
    scroll: faScroll,
    diceOption: faDiceD20,
  };
  @Input() userInfo!: IUser;
  @Input() isBasicInfo!: boolean;
  @Input() isAddressInfo!: boolean;
  @Input() peopleInfo!: IPeople;

  constructor(private userService: UserService) {}

  editProfile() {
    this.userService.editUserProfile();
  }
}
