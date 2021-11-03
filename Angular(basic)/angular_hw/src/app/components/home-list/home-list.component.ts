import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMovie } from 'src/app/models/movie.interface';
import { MovieService } from '../../services/movie.service';
import {  map } from 'rxjs/operators';
import { HomeFiltersComponent } from '../home-filters/home-filters.component';
import { MovieFilterService } from 'src/app/services/movie-filter.service';
import { IMovieFilters } from 'src/app/models/movie-filters.interface';
import { FavouriteService } from 'src/app/services/favourite.service';


@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {
  @Input() moviesList: IMovie[] = [];
  @Input() filteredPages: boolean = false;
  @Output() pageChanged = new EventEmitter();
  rateStr: string = '';
  pages: number[] = [1,2,3,4,5];
  @Input() filters: IMovieFilters = {genre: '',year: 2021};

  isFavourite: boolean = false;
  favouritesArr: number[] = [];


  // message: number[] = [];
  constructor(private movieService: MovieService, private movieFilterService: MovieFilterService, private favouriteService: FavouriteService) { }


  ngOnInit(): void {
    // this.favouriteService.currentMessage.subscribe(message => this.message = message)
    this.movieService.getMovie()
      .pipe(
        map((movie: any) => movie.results),
        map((movies: any) => {
          if (localStorage.getItem('favouriteData')) {
            movies.forEach((movie: any) => {
              this.favouritesArr = JSON.parse(localStorage.getItem('favouriteData') || '{}');
              if (this.favouritesArr.includes(movie.id)) {
                movie.isFavourite = true
              } else {
                movie.isFavourite = false
              }
            })
          }
          return movies
        })
      )
      .subscribe((movies: IMovie[]) => {
        this.moviesList = movies
    });
  }
  ngOnDestroy(): void {
    console.log('destroyed');
  }
  public pageClick(page: number): void{
    this.movieService.getMovie(page)
      .pipe(
        map((movie:any) => movie.results),
        map((movies: any) => {
          if (localStorage.getItem('favouriteData')) {
            movies.forEach((movie: any) => {
              this.favouritesArr = JSON.parse(localStorage.getItem('favouriteData') || '{}');
              if (this.favouritesArr.includes(movie.id)) {
                movie.isFavourite = true
              } else {
                movie.isFavourite = false
              }
            })
          }
          return movies
        })
      )
      .subscribe((movies: IMovie[]) => {
        this.moviesList = movies
    });
  }
  public pageFilteredClick(page: number): void{
    console.log(this.filters);
    this.movieFilterService.getMovieFiltered(this.filters.genre, this.filters.year, page)
      .pipe(
        map((movie:any) => movie.results),
        map((movies: any) => {
          if (localStorage.getItem('favouriteData')) {
            movies.forEach((movie: any) => {
              this.favouritesArr = JSON.parse(localStorage.getItem('favouriteData') || '{}');
              if (this.favouritesArr.includes(movie.id)) {
                movie.isFavourite = true
              } else {
                movie.isFavourite = false
              }
            })
          }
          return movies
        })
      )
      .subscribe((movies: IMovie[]) => {
        this.moviesList = movies
    });
  }
  public addToFavourite(id: number){
    this.moviesList.forEach(movie => {
      if(movie.id === id){
        if(movie.isFavourite == true){
          movie.isFavourite = false;

          this.favouritesArr = JSON.parse(localStorage.getItem('favouriteData') || '{}');
          this.favouritesArr.splice(this.favouritesArr.indexOf(id),1);
          localStorage.setItem('favouriteData', JSON.stringify(this.favouritesArr));
          console.log(this.favouritesArr);
        }else{
          movie.isFavourite = true;

          if(!localStorage.getItem('favouriteData')) {  
            this.favouritesArr.push(id);
            console.log(this.favouritesArr);
            localStorage.setItem('favouriteData', JSON.stringify(this.favouritesArr));
         } else {
            this.favouritesArr = JSON.parse(localStorage.getItem('favouriteData') || '{}');
            if(this.favouritesArr.indexOf(id) == -1){
              this.favouritesArr.push(id);
              localStorage.setItem('favouriteData', JSON.stringify(this.favouritesArr));
            }
            console.log(this.favouritesArr);
         }
        }
      }
    });
    // this.favouriteService.changeMessage(this.favouritesArr)
  }
}
