import { Movie } from '@/features/movies/domain/interfaces/Movie';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MovieTrendComponent } from '../movie-trend/movie-trend.component';
import { MoviesRepositoryImpl } from '@/features/movies/infrastructure/repositories/movies.repository.impl';
import { SkeletonComponent } from '@/shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-list-movie-trend',
  imports: [MovieTrendComponent, SkeletonComponent],
  providers: [MoviesRepositoryImpl],
  templateUrl: './list-movie-trend.component.html',
  styleUrl: './list-movie-trend.component.css',
})
export class ListMovieTrendComponent implements OnInit {
  private _moviesRepository: MoviesRepositoryImpl =
    inject(MoviesRepositoryImpl);
  // Declare an input named 'value' with a default value of zero.
  movies = signal<Movie[]>([]);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.loading.set(true);
    this._moviesRepository.getTrendingMovies().subscribe({
      next: (response) => {
        console.log(response);
        this.movies.update((oldValue) => [...oldValue, ...response.results]);
        this.loading.set(false);
      },
      error: (error) => {
        console.log('Error', error);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  get moviesMock() {
    return Array.from({
      length: 8,
    });
  }
}
