import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { IMovieFilters } from 'src/app/models/movie-filters.interface';
import { ITvShowFilter } from 'src/app/models/tv-show-filter.interface';
import { ITvShow } from 'src/app/models/tv-show.interface';
import { TvShowFilterService } from 'src/app/services/tv-show-filter.service';
import { TvShowService } from 'src/app/services/tv-show.service';

@Component({
  selector: 'app-tv-shows-list',
  templateUrl: './tv-shows-list.component.html',
  styleUrls: ['./tv-shows-list.component.scss']
})
export class TvShowsListComponent implements OnInit {

  @Input() tvShowsList: ITvShow[] = [];  
  pages: number[] = [1,2,3,4,5];
  @Input() filteredPages: boolean = false;
  @Output() pageChanged = new EventEmitter();
  rateStr: string = '';
  @Input() filters: ITvShowFilter = {genre: '',year: 2021};
  constructor(private tvShowService: TvShowService, private tvShowFilterService: TvShowFilterService) { }

  ngOnInit(): void {
  }
  public pageClick(page: number): void{
    this.tvShowService.getTvShow(page)
      .pipe(
        map((tvShow:any) => tvShow.results)
      )
      .subscribe((tvShows: ITvShow[]) => {
        this.tvShowsList = tvShows
    });
  }
  public pageFilteredClick(page: number): void{
    this.tvShowFilterService.getTvShowFiltered(this.filters.genre, this.filters.year, page)
      .pipe(
        map((tvShow:any) => tvShow.results)
      )
      .subscribe((tvShows: ITvShow[]) => {
        this.tvShowsList = tvShows
    });
  }
}
