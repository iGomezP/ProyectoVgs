import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HealthService {
  constructor(private httpClient: HttpClient) {}

  checkHealth(): Observable<any> {
    const url = 'api/health';
    return this.httpClient.get(environment.baseUrl + url);
  }
}
