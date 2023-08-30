import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { faBackwardStep, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Platform } from 'src/app/models/platform.model';
import { GeneralAuxService } from 'src/app/services/auxiliary/general-aux.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  mainMenuItems: MenuItem[] | undefined;
  sidebarStore: boolean = false;
  sidebarUser: boolean = false;
  iconClose = faXmark;
  backIcon = faBackwardStep;
  platforms: Platform[] = [];

  constructor(public generalAuxService: GeneralAuxService) {}

  ngOnInit(): void {
    this.mainMenuItems = [
      {
        label: 'All Games',
        routerLink: '/',
        command: () => this.closeSideBar(),
      },
      {
        label: 'PlayStation',
        routerLink: '/',
        command: () => this.closeSideBar(),
      },
      {
        label: 'Xbox',
        routerLink: '/',
        command: () => this.closeSideBar(),
      },
      {
        label: 'Nintendo',
        routerLink: '/',
        command: () => this.closeSideBar(),
      },
      // {
      //   label: 'Server Health Check',
      //   icon: 'pi pi-fw pi-server',
      //   routerLink: '/health',
      //   command: () => this.closeSideBar(),
      // },
    ];
  }

  closeSideBar() {
    this.sidebarStore = false;
  }
}
