import { Component, OnInit } from '@angular/core';
import { MsalGuardConfiguration, MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'VgsFront';
  isIframe = false;

  constructor(private authService: MsalService) {}

  ngOnInit(): void {}
}
