import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/api/weather.service';
import { WeatherForecast } from 'src/app/models/weather.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  weatherForecast: WeatherForecast[] | undefined;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather();
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
