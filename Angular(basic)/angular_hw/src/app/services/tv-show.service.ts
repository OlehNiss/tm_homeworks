import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITvShow } from '../models/tv-show.interface';

@Injectable()
export class TvShowService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.API_KEY}`
    })
  }
  constructor(private httpClient: HttpClient) { }
  
  public getTvShow(page: number = 1): Observable<ITvShow[]> {
    return this.httpClient.get<ITvShow[]>(`${environment.BASE_URL}/tv/popular?api_key=${environment.API_KEY}&page=${page}`, this.httpOptions)
  }
}
