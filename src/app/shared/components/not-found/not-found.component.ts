import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralAuxService } from 'src/app/services/auxiliary/general-aux.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor(
    private router: Router,
    private generalAuxService: GeneralAuxService
  ) {}

  redirectPage() {
    setTimeout(() => {
      this.router.navigate(['']);
    }, 5000);
  }

  ngOnInit(): void {
    this.generalAuxService.hideHeaderAndFooter(true);
    this.redirectPage();
  }
}
