import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMovie } from '../models/movie.interface';
import { ITvShow } from '../models/tv-show.interface';

@Injectable()
export class SearchService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.API_KEY}`
    })
  }
  constructor(private httpClient: HttpClient) { }

  public searchMovie(strToSearch: string): Observable<IMovie[]> {
    return this.httpClient.get<IMovie[]>(`${environment.BASE_URL}/search/movie?api_key={api_key}&query=${strToSearch}`, this.httpOptions)
  }
  public searchTvShow(strToSearch: string): Observable<ITvShow[]> {
    return this.httpClient.get<ITvShow[]>(`${environment.BASE_URL}/search/tv?api_key={api_key}&query=${strToSearch}`, this.httpOptions)
  }
  public searchPeople(strToSearch: string): Observable<ITvShow[]> {
    return this.httpClient.get<ITvShow[]>(`${environment.BASE_URL}/search/person?api_key={api_key}&query=${strToSearch}`, this.httpOptions)
  }
}
