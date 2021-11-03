import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { PeopleComponent } from './components/people/people.component';
import { TvShowsComponent } from './components/tv-shows/tv-shows.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'tv-shows', component: TvShowsComponent},
  { path: 'search', component: SearchComponent},
  { path: 'people', component: PeopleComponent},
  { path: 'favourite', component: FavouriteComponent},
  { path: 'about', component: AboutComponent},
  { path: '**', redirectTo: '/home' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
