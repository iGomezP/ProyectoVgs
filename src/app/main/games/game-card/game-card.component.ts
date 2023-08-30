import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VgsApiService } from '../../../services/api/vgs-api.service';
import { GamesModel } from 'src/app/models/games.model';
import { faGamepad, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import {
  faPlaystation,
  faXbox,
  faSteam,
  faLinux,
  faApple,
  faAndroid,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  gameDetails!: GamesModel;
  responsiveOptions: any[] | undefined;
  faIcons = {
    generic: faGamepad,
    ps: faPlaystation,
    xbox: faXbox,
    pc: faSteam,
    linux: faLinux,
    mac: faApple,
    android: faAndroid,
    money: faMoneyBillWave,
  };

  constructor(
    private route: ActivatedRoute,
    private vgsApiService: VgsApiService
  ) {}

  ngOnInit(): void {
    const gameSlug = this.route.snapshot.params['slug'];
    this.vgsApiService.getGameBySlug(gameSlug).subscribe({
      next: (res) => {
        this.gameDetails = res;
        this.sortItems(this.gameDetails);
        console.log(this.gameDetails);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getPlatformIcon(platform: string): any {
    if (platform.includes('PC')) return this.faIcons.pc;
    if (platform.includes('Linux')) return this.faIcons.linux;
    if (platform.includes('Mac') || platform.includes('iOS'))
      return this.faIcons.mac;
    if (platform.includes('Xbox')) return this.faIcons.xbox;
    if (platform.includes('Android')) return this.faIcons.android;
    if (platform.includes('PlayStation')) return this.faIcons.ps;
    return this.faIcons.generic;
  }

  sortItems(gameDetails: GamesModel) {
    gameDetails.platforms.sort((a, b) => a.localeCompare(b));
    gameDetails.genres.sort((a, b) => a.localeCompare(b));
    gameDetails.screenshots.sort((a, b) => a.localeCompare(b));
  }
}
