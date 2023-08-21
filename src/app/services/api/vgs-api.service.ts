import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.baseUrl;

const httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class VgsApiService {
  constructor(private httpClient: HttpClient) {}

  getPlatforms(): Observable<any> {
    const url = 'api/platforms';
    return this.httpClient.get(AUTH_API + url);
  }

  loginUser(email: string): Observable<any> {
    const url = 'api/user/login';
    return this.httpClient.post<any>(
      AUTH_API + url,
      {
        email: email,
      },
      {
        headers: httpOptions,
        observe: 'response',
      }
    );
  }
}
