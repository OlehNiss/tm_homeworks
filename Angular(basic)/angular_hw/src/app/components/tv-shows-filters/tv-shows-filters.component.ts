import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ITvShowFilter } from 'src/app/models/tv-show-filter.interface';
import { ITvShow } from 'src/app/models/tv-show.interface';
import { TvShowFilterService } from 'src/app/services/tv-show-filter.service';

@Component({
  selector: 'app-tv-shows-filters',
  templateUrl: './tv-shows-filters.component.html',
  styleUrls: ['./tv-shows-filters.component.scss']
})
export class TvShowsFiltersComponent implements OnInit {
  genres = ['Action & Adventure','Animation','Comedy',
  'Crime','Documentary','Drama','Family','Kids',
  'Mystery','News','Reality','Sci-Fi & Fantasy',
  'Soap','Talk', 'War & Politics', 'Western'];
  years = [2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010];

  filteredTvShows: ITvShow[] = [];
  @Output() tvShowFiltered = new EventEmitter();
  public isFiltered: boolean = false;
  @Output() isFilteredPages = new EventEmitter();
  filteredPage = 1;
  @Output() filtersObj = new EventEmitter<ITvShowFilter>();

  public newTVFilterForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private tvShowFilterService: TvShowFilterService) { 
    this.newTVFilterForm = {} as FormGroup;
  }
  ngOnInit(): void {
    this.newTVFilterForm = this.formBuilder.group({
      // country: "",
      genre: "Action & Adventure",
      year: 2021
    })
  }
  public createFilter():void{
    this.newTVFilterForm.value.genre = this.choosenGenre(this.newTVFilterForm.value.genre)
    this.tvShowFilterService.getTvShowFiltered(this.newTVFilterForm.value.genre,this.newTVFilterForm.value.year, 1)
      .pipe(
        map((tvShows:any) => tvShows.results)
      )
      .subscribe((tvShows: ITvShow[]) => {
        this.filteredTvShows = tvShows;
        this.tvShowFiltered.emit(this.filteredTvShows);
        this.isFiltered = true
        this.isFilteredPages.emit(this.isFiltered);
        this.filtersObj.emit(this.newTVFilterForm.value);
    });
  }
  choosenGenre(someGenreName: string): any{
    if(someGenreName == 'Action & Adventure'){
      return '10759';
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
    else if(someGenreName == 'Kids'){
      return '10762';
    }
    else if(someGenreName == 'Mystery'){
      return '9648';
    }
    else if(someGenreName == 'News'){
      return '10763';
    }
    else if(someGenreName == 'Reality'){
      return '10764';
    }
    else if(someGenreName == 'Sci-Fi & Fantasy'){
      return '10765';
    }
    else if(someGenreName == 'Soap'){
      return '10766';
    }
    else if(someGenreName == 'Talk'){
      return '10767';
    }
    else if(someGenreName == 'War & Politics'){
      return '10768';
    }
    else if(someGenreName == 'Western'){
      return '37';
    }
    else{
      return someGenreName;
    }
  }

}
