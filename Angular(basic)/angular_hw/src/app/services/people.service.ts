import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPeople } from '../models/people.interface';

@Injectable()
export class PeopleService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.API_KEY}`
    })
  }
  constructor(private httpClient: HttpClient) { }

  public getPeople(page: number = 1): Observable<IPeople[]> {
    return this.httpClient.get<IPeople[]>(`${environment.BASE_URL}/person/popular?api_key=${environment.API_KEY}&page=${page}`, this.httpOptions)
  }
}
