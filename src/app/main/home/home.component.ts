import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/api/weather.service';
import { WeatherForecast } from 'src/app/models/weather.model';
import { GeneralAuxService } from '../../services/auxiliary/general-aux.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  weatherForecast: WeatherForecast[] | undefined;

  constructor(
    private weatherService: WeatherService,
    private generalAuxService: GeneralAuxService
  ) {}

  ngOnInit(): void {
    this.getWeather();
    this.generalAuxService.hideHeaderAndFooter(false);
  }

  getWeather() {
    this.weatherService.checkWeather().subscribe({
      next: (data) => {
        this.weatherForecast = data;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
}
