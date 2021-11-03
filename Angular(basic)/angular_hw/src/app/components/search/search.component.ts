import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { IMovie } from 'src/app/models/movie.interface';
import { IPeople } from 'src/app/models/people.interface';
import { ITvShow } from 'src/app/models/tv-show.interface';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchedMovies: any[] = [];
  searchedTVShows: any[] = [];
  searchedPeople: any[] = [];


  searchType: string = '';
  movieToSearch: string = '';
  favouritesArr: number[] = [];

  public newFilterForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private searchServise: SearchService) { 
    this.newFilterForm = {} as FormGroup;
  }

  ngOnInit(): void {
    this.newFilterForm = this.formBuilder.group({
      // country: "",
      type: "movie",
      input: ''
    })
  }
  searchMovie() {
    if(this.newFilterForm.value.type === 'movie'){
      this.searchType = 'movie';

      this.searchServise.searchMovie(this.newFilterForm.value.input)
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
        this.searchedMovies = movies
      });
    }else if(this.newFilterForm.value.type === 'tv'){
      this.searchType = 'tv'

      this.searchServise.searchTvShow(this.newFilterForm.value.input)
      .pipe(
        map((show: any) => show.results),
        // map((shows: any) => {
        //   if (localStorage.getItem('favouriteData')) {
        //     shows.forEach((show: any) => {
        //       this.favouritesArr = JSON.parse(localStorage.getItem('favouriteData') || '{}');
        //       if (this.favouritesArr.includes(show.id)) {
        //         show.isFavourite = true
        //       } else {
        //         show.isFavourite = false
        //       }
        //     })
        //   }
        //   return shows
        // })
      )
      .subscribe((shows: ITvShow[]) => {
        this.searchedTVShows = shows
      });
    }else if(this.newFilterForm.value.type === 'people'){
      this.searchType = 'people';

      this.searchServise.searchPeople(this.newFilterForm.value.input)
      .pipe(
        map((people: any) => people.results),
        // map((shows: any) => {
        //   if (localStorage.getItem('favouriteData')) {
        //     shows.forEach((show: any) => {
        //       this.favouritesArr = JSON.parse(localStorage.getItem('favouriteData') || '{}');
        //       if (this.favouritesArr.includes(show.id)) {
        //         show.isFavourite = true
        //       } else {
        //         show.isFavourite = false
        //       }
        //     })
        //   }
        //   return shows
        // })
      )
      .subscribe((people: IPeople[]) => {
        this.searchedPeople = people
      });
    }
  }
  addToFavourite(id: number){
    this.searchedMovies.forEach(movie => {
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
  }
}
