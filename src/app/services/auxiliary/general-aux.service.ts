import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralAuxService {
  hideBars: any;

  constructor() {}

  hideHeaderAndFooter(barsState: boolean) {
    this.hideBars = barsState;
  }
}
