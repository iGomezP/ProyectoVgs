import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  checkWeather(): Observable<any> {
    const url = 'api/weatherforecast';
    return this.httpClient.get(environment.baseUrl + url);
  }
}
