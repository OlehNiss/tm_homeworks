import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMovie } from '../models/movie.interface';
import { Observable } from 'rxjs';


@Injectable()
export class MovieFilterService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.API_KEY}`
    })
  }
  constructor(private httpClient: HttpClient) { }

  public getMovieFiltered(genre: string, year: number, page: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.BASE_URL}/discover/movie?api_key=${environment.API_KEY}&with_genres=${genre}&year=${year}&sort_by=popularity.desc&page=${page}`, this.httpOptions)
  }
}
