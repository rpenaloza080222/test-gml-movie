import { GenreListComponent } from '@/features/genres/ui/components/genre-list/genre-list.component';
import { ListMovieTrendComponent } from '@/features/movies/ui/components/list-movie-trend/list-movie-trend.component';
import { ListMoviesComponent } from '@/features/movies/ui/components/list-movies/list-movies.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [ListMovieTrendComponent, ListMoviesComponent, GenreListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
