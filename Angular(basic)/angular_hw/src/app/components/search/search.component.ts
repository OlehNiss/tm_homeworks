import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IMovie } from 'src/app/models/movie.interface';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchedMovies: IMovie[] = [];

  movieToSearch: string = '';
  constructor(private searchServise: SearchService) { }

  ngOnInit(): void {
  }
  searchMovie(str: string){
    this.searchServise.searchMovie(str)
      .pipe(
        map((movie:any) => movie.results),
        // map((movies: any) => {
        //   if (localStorage.getItem('favouriteData')) {
        //     movies.forEach((movie: any) => {
        //       this.favouritesArr = JSON.parse(localStorage.getItem('favouriteData') || '{}');
        //       if (this.favouritesArr.includes(movie.id)) {
        //         movie.isFavourite = true
        //       } else {
        //         movie.isFavourite = false
        //       }
        //     })
        //   }
        //   return movies
        // })
      )
      .subscribe((movies: IMovie[]) => {
        this.searchedMovies = movies
    });
  }
}
