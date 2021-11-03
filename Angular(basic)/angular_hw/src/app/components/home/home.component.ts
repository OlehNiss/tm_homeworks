import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IMovie } from '../../models/movie.interface';
import {  map } from 'rxjs/operators';
import { IMovieFilters } from 'src/app/models/movie-filters.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // public movie: any;
  public movies: IMovie[] = [];
  public isPagesFiltered: boolean = false;
  public filtersObj: IMovieFilters = {genre: '', year: 2021};

  constructor(private movieService: MovieService) { }

  // ngOnInit(): void {
  //   this.movieService.getMovie(12)
  //     .subscribe((movie: IMovie) => {
  //       this.movie = movie
  //       console.log(movie);
  //   });
  // }
  ngOnInit(): void {
    
  }
  //get filtered movies arr to home-list to show it
  public filtersChosen(genreMovies: IMovie[]): void{
    this.movies = genreMovies;
  }
  //get boolean value to pages so pages will work for filtered movie
  public pagesFiltered(isFiltered: boolean): void{
    this.isPagesFiltered = isFiltered;
  }
  //get object of filters to call new http request with filtered movies of some page
  public getFiltersObj(filtersObject: IMovieFilters): void{
    this.filtersObj = filtersObject;
  }
}
