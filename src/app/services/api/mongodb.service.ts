import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MongodbService {
  mongoUrl =
    'mongodb+srv://VsgAdmin:tUSTHSlyzi0Xnsix@clustervgs.wloqrkp.mongodb.net/';

  constructor(private httpClient: HttpClient) {}

  getCollection(collectionName: string): Observable<any[]> {
    const url = `${this.mongoUrl}/${collectionName}`;
    return this.httpClient.get<any[]>(url);
  }
}