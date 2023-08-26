import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { faBackwardStep, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Sidebar } from 'primeng/sidebar';
import { VgsApiService } from 'src/app/services/api/vgs-api.service';
import { Platform } from 'src/app/models/platform.model';
import { ToastService } from '../../../services/auxiliary/toast.service';
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
        label: 'GAMES',
        items: [
          {
            label: 'By Platform',
            items: [
              { label: 'Pc' },
              { label: 'Ps4' },
              { label: 'Ps5' },
              { label: 'Xbox Series' },
              { label: 'Nintendo Switch' },
            ],
          },
          {
            label: 'By Genre',
            items: [
              { label: 'Singleplayer' },
              { label: 'Multiplayer' },
              { label: 'Action' },
              { label: '1st Person' },
              { label: '3rd Person' },
              { label: 'Simulation' },
              { label: 'Sports' },
              { label: 'Cooperative' },
              { label: 'FPS' },
              { label: 'Adventure' },
              { label: 'Racing' },
              { label: 'Strategy' },
            ],
          },
          {
            label: 'By Price',
            items: [
              { label: 'Games Under $1' },
              { label: 'Games Under $5' },
              { label: 'Games Under $10' },
              { label: 'Games Under $15' },
              { label: 'Games Under $20' },
              { label: 'Games for $20 and more' },
            ],
          },
        ],
      },
      {
        label: 'PSN',
        items: [
          { label: 'PSN GAMES' },
          { label: 'PSN GIFT CARDS' },
          { label: 'PS PLUS MEMBERSHIPS' },
        ],
      },
      {
        label: 'XBOX',
        items: [
          { label: 'XBOX GAMES' },
          { label: 'XBOX LIVE GIFT CARDS' },
          { label: 'XBOX GAME PASS' },
        ],
      },
      {
        label: 'NINTENDO',
        items: [{ label: 'Switch GAMES' }, { label: 'eSHop GIFT CARDS' }],
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
