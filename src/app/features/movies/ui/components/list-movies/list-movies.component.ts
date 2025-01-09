import { Movie } from '@/features/movies/domain/interfaces/Movie';
import { MoviesRepositoryImpl } from '@/features/movies/infrastructure/repositories/movies.repository.impl';
import { Component, inject, signal } from '@angular/core';
import { MovieTrendComponent } from '../movie-trend/movie-trend.component';

@Component({
  selector: 'app-list-movies',
  imports: [MovieTrendComponent],
  providers: [MoviesRepositoryImpl],
  templateUrl: './list-movies.component.html',
  styleUrl: './list-movies.component.css'
})
export class ListMoviesComponent {
  private _moviesRepository: MoviesRepositoryImpl =
    inject(MoviesRepositoryImpl);

  movies = signal<Movie[]>([])

  ngOnInit(): void {
    this._moviesRepository.getTrendingMovies().subscribe((response) => {
      console.log(response);
      this.movies.update((oldValue) => [...oldValue, ...response.results]);
    });
  }
}
