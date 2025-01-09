import { Movie } from '@/features/movies/domain/interfaces/Movie';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MovieTrendComponent } from '../movie-trend/movie-trend.component';
import { MoviesRepositoryImpl } from '@/features/movies/infrastructure/repositories/movies.repository.impl';

@Component({
  selector: 'app-list-movie-trend',
  imports: [MovieTrendComponent],
  providers: [MoviesRepositoryImpl],
  templateUrl: './list-movie-trend.component.html',
  styleUrl: './list-movie-trend.component.css',
})
export class ListMovieTrendComponent implements OnInit {
  private _moviesRepository: MoviesRepositoryImpl =
    inject(MoviesRepositoryImpl);
  // Declare an input named 'value' with a default value of zero.
  movies = signal<Movie[]>([]);

  ngOnInit(): void {
    this._moviesRepository.getTrendingMovies().subscribe((response) => {
      console.log(response);
      this.movies.update((oldValue) => [...oldValue, ...response.results]);
    });
  }
}
