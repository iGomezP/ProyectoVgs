import { Component, OnInit } from '@angular/core';
import { GamesModel } from 'src/app/models/games.model';
import { VgsApiService } from 'src/app/services/api/vgs-api.service';
import { Observable, map } from 'rxjs';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  gamesList$: Observable<any> | undefined;
  stockText = '';
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  selectedSortOption = 'default';
  layout: string = 'list';

  constructor(private vgsService: VgsApiService) {}

  ngOnInit(): void {
    this.getAllGames();
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
      { label: 'Name A to Z', value: 'name' },
      { label: 'Name Z to A', value: '!name' },
    ];
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
    switch (this.sortField) {
      case 'price':
        this.sortByPrice();
        break;
      case 'name':
        this.sortByName();
        break;
      // Handle other sorting options...
      default:
        // Handle the default sorting option
        break;
    }
  }

  sortByName() {
    this.gamesList$ = this.gamesList$?.pipe(
      map((games) => {
        return games.sort((a: { name: string }, b: { name: string }) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return this.sortOrder * -1;
          }
          if (nameA > nameB) {
            return this.sortOrder;
          }
          return 0;
        });
      })
    );
  }

  sortByPrice() {
    this.gamesList$ = this.gamesList$?.pipe(
      map((games) => {
        return games.sort((a: { price: number }, b: { price: number }) => {
          if (a.price < b.price) {
            return this.sortOrder * -1;
          }
          if (a.price > b.price) {
            return this.sortOrder;
          }
          return 0;
        });
      })
    );
  }

  getAllGames() {
    this.gamesList$ = this.vgsService.getAllVideoGames();
  }

  getSeverity(gameItem: GamesModel) {
    switch (true) {
      case gameItem.stock > 3:
        return 'success';
      case gameItem.stock > 0 && gameItem.stock < 3:
        return 'warning';
      case gameItem.stock === 0:
        return 'danger';
      default:
        return undefined;
    }
  }

  getStockText(gameItem: GamesModel) {
    switch (true) {
      case gameItem.stock > 3:
        return 'INSTOCK';
      case gameItem.stock > 0 && gameItem.stock < 3:
        return 'LOWSTOCK';
      case gameItem.stock === 0:
        return 'OUTOFSTOCK';
      default:
        return undefined;
    }
  }
}
