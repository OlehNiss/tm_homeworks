import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from './services/movie.service';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { HomeListComponent } from './components/home-list/home-list.component';
import { HomeFiltersComponent } from './components/home-filters/home-filters.component';
import { MovieFilterService } from './services/movie-filter.service';
import { PeopleComponent } from './components/people/people.component';
import { PeopleService } from './services/people.service';
import { TvShowsComponent } from './components/tv-shows/tv-shows.component';
import { TvShowService } from './services/tv-show.service';
import { TvShowsListComponent } from './components/tv-shows-list/tv-shows-list.component';
import { TvShowsFiltersComponent } from './components/tv-shows-filters/tv-shows-filters.component';
import { TvShowFilterService } from './services/tv-show-filter.service';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { FavouriteService } from './services/favourite.service';
import { SearchComponent } from './components/search/search.component';
import { SearchService } from './services/search.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    HomeListComponent,
    HomeFiltersComponent,
    PeopleComponent,
    TvShowsComponent,
    TvShowsListComponent,
    TvShowsFiltersComponent,
    FavouriteComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MovieService, MovieFilterService,PeopleService,TvShowService,TvShowFilterService,FavouriteService,SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
