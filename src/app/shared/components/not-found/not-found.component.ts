import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fa0, fa4, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { GeneralAuxService } from 'src/app/services/auxiliary/general-aux.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  faIcons = {
    zero: fa0,
    four: fa4,
    exclamation: faExclamation,
  };
  constructor(private router: Router) {}

  redirectPage() {
    setTimeout(() => {
      this.router.navigate(['']);
    }, 5000);
  }

  ngOnInit(): void {
    this.redirectPage();
  }
}
