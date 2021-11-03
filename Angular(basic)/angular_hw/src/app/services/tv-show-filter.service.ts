import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITvShow } from '../models/tv-show.interface';

@Injectable()
export class TvShowFilterService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.API_KEY}`
    })
  }
  constructor(private httpClient: HttpClient) { }

  public getTvShowFiltered(genre: string, first_air_date_year: number, page: number): Observable<ITvShow[]> {
    return this.httpClient.get<ITvShow[]>(`${environment.BASE_URL}/discover/tv?api_key=${environment.API_KEY}&with_genres=${genre}&first_air_date_year=${first_air_date_year}&sort_by=popularity.desc&page=${page}`, this.httpOptions)
  }
}
