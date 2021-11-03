import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMovie } from '../models/movie.interface';

@Injectable()
export class FavouriteService {
  // private messageSource = new BehaviorSubject<number[]>([0,1]);
  // currentMessage = this.messageSource.asObservable();


  constructor(private httpClient: HttpClient) { }
  
  // changeMessage(message: number[]){
  //   this.messageSource.next(message);
  // }
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.API_KEY}`
    })
  }
  public getFavouriteMovie(movieId: number): Observable<IMovie[]> {
    return this.httpClient.get<IMovie[]>(`${environment.BASE_URL}/movie/${movieId}`, this.httpOptions)
  }
}
