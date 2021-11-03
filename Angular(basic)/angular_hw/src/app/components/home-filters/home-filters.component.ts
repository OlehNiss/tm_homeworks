import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { IMovieFilters } from 'src/app/models/movie-filters.interface';
import { IMovie } from 'src/app/models/movie.interface';
import { MovieFilterService } from 'src/app/services/movie-filter.service';

@Component({
  selector: 'app-home-filters',
  templateUrl: './home-filters.component.html',
  styleUrls: ['./home-filters.component.scss']
})
export class HomeFiltersComponent implements OnInit {
  genres = ['Action','Adventure','Animation','Comedy',
  'Crime','Documentary','Drama','Family','Fantasy',
  'History','Horror','Music','Mystery','Romance',
  'Science Fiction','TV Movie','Thriller','War', 'Western'];
  years = [2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010];
  public filteredMovies: IMovie[] = [];
  @Output() movieFiltered = new EventEmitter();
  public isFiltered: boolean = false;
  @Output() isFilteredPages = new EventEmitter();
  filteredPage = 1;
  @Output() filtersObj = new EventEmitter<IMovieFilters>();

  favouritesArr: number[] = [];
  public newFilterForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private movieFilterService: MovieFilterService) { 
    this.newFilterForm = {} as FormGroup;
  }

  ngOnInit(): void {
    this.newFilterForm = this.formBuilder.group({
      // country: "",
      genre: "Action",
      year: 2021
    })
  }
  public createFilter(page: number = this.filteredPage):void{
    console.log(this.newFilterForm.value.genre);
    this.newFilterForm.value.genre = this.choosenGenre(this.newFilterForm.value.genre)
    this.movieFilterService.getMovieFiltered(this.newFilterForm.value.genre,this.newFilterForm.value.year, page)
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
        this.filteredMovies = movies
        this.movieFiltered.emit(this.filteredMovies);
        this.isFiltered = true
        this.isFilteredPages.emit(this.isFiltered);
        this.filtersObj.emit(this.newFilterForm.value);
    });
  }
  choosenGenre(someGenreName: string): any{
    if(someGenreName == 'Action'){
      return '28';
    }
    else if(someGenreName == 'Adventure'){
      return '12';
    }
    else if(someGenreName == 'Animation'){
      return '16';
    }
    else if(someGenreName == 'Comedy'){
      return '35';
    }
    else if(someGenreName == 'Crime'){
      return '80';
    }
    else if(someGenreName == 'Documentary'){
      return '99';
    }
    else if(someGenreName == 'Drama'){
      return '18';
    }
    else if(someGenreName == 'Family'){
      return '10751';
    }
    else if(someGenreName == 'Fantasy'){
      return '14';
    }
    else if(someGenreName == 'History'){
      return '36';
    }
    else if(someGenreName == 'Horror'){
      return '27';
    }
    else if(someGenreName == 'Music'){
      return '10402';
    }
    else if(someGenreName == 'Mystery'){
      return '9648';
    }
    else if(someGenreName == 'Romance'){
      return '10749';
    }
    else if(someGenreName == 'Science Fiction'){
      return '878';
    }
    else if(someGenreName == 'TV Movie'){
      return '10770';
    }
    else if(someGenreName == 'Thriller'){
      return '53';
    }
    else if(someGenreName == 'War'){
      return '10752';
    }
    else if(someGenreName == 'Western'){
      return '37';
    }
    else{
      return someGenreName;
    }
  }
}
