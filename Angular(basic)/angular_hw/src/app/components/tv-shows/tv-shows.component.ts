import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ITvShowFilter } from 'src/app/models/tv-show-filter.interface';
import { ITvShow } from 'src/app/models/tv-show.interface';
import { TvShowService } from 'src/app/services/tv-show.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit {

  tvShows: ITvShow[] = []
  public isPagesFiltered: boolean = false;
  public filtersObj: ITvShowFilter = {genre: '', year: 2021};
  constructor(private movieService: TvShowService) { }

  ngOnInit(): void {
    this.movieService.getTvShow()
      .pipe(
        map((tv_show: any) => tv_show.results)
      )
      .subscribe((tv_shows: ITvShow[]) => {
        this.tvShows = tv_shows
    });
  }
  childTVShowsFiltered(filteredTVShows: ITvShow[]){
    this.tvShows = filteredTVShows;
  }
  //get boolean value to pages so pages will work for filtered movie
  public pagesFiltered(isFiltered: boolean): void{
    this.isPagesFiltered = isFiltered;
  }
  //get object of filters to call new http request with filtered movies of some page
  public getFiltersObj(filtersObject: ITvShowFilter): void{
    this.filtersObj = filtersObject;
  }
}
