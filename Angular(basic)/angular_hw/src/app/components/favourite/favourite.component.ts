import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMovie } from 'src/app/models/movie.interface';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  // private subs: Subscription = new Subscription();

  favIds: number[] =[];
  // message: number[] = [];
  favMovies: IMovie[] = [];
  constructor(private favouriteService: FavouriteService) { }


  ngOnInit(): void {
    if(localStorage.getItem('favouriteData')) {  
      this.favIds = JSON.parse(localStorage.getItem('favouriteData') || '{}');
      console.log(this.favIds);

      this.favIds.forEach(elemId => {
        this.favouriteService.getFavouriteMovie(elemId)
        .pipe(
          map((movie: any) => {
              this.favIds = JSON.parse(localStorage.getItem('favouriteData') || '{}');
              if(this.favIds.includes(movie.id)){
                movie.isFavourite = true
              }else {
                movie.isFavourite = false
              }
            return movie
          })
        )
        .subscribe((movie: any) => {
          this.favMovies.push(movie);
        });
      });
    }
    // this.favouriteService.currentMessage.subscribe(message => this.message = message)
  }
  deleteFavourite(idToDel: number){
    this.favMovies.forEach(favMovie => {
      if(favMovie.id === idToDel){
        if(favMovie.isFavourite == true){
          favMovie.isFavourite = false;
          console.log(this.favMovies);
          

          this.favIds = JSON.parse(localStorage.getItem('favouriteData') || '{}');
          this.favIds.splice(this.favIds.indexOf(idToDel),1);
          localStorage.setItem('favouriteData', JSON.stringify(this.favIds));
          console.log(this.favIds);

          this.favMovies.splice(this.favMovies.indexOf(favMovie), 1);
          console.log(this.favMovies);
          }
        }
    })
  }
  // ngOnDestroy(): void {
  //   this.subs.unsubscribe();
  // }

  // logIt(){
  //   console.log(this.message);
  // }
}
