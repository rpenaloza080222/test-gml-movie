import { Movie } from '@/features/movies/domain/interfaces/Movie';
import { MoviesRepositoryImpl } from '@/features/movies/infrastructure/repositories/movies.repository.impl';
import { Component, effect, inject, signal } from '@angular/core';
import { MovieTrendComponent } from '../movie-trend/movie-trend.component';
import { MoviesFilter } from '@/features/movies/domain/repositories/movies.repository';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MovieListGridComponent } from '@/shared/components/movie-list-grid/movie-list-grid.component';

@Component({
  selector: 'app-list-movies',
  imports: [MovieListGridComponent],
  providers: [MoviesRepositoryImpl],
  templateUrl: './list-movies.component.html',
  styleUrl: './list-movies.component.css',
})
export class ListMoviesComponent {
  private _moviesRepository: MoviesRepositoryImpl =
    inject(MoviesRepositoryImpl);
  private _route = inject(ActivatedRoute);

  filterAllMoviesSubscription = signal<Subscription | undefined>(undefined);
  filterOptionsSubscription = signal<Subscription | undefined>(undefined);

  constructor() {}

  updateQuery(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value ?? '';
    this._moviesRepository.filterOptions.update((value) => ({
      ...value,
      page: 1,
      query: inputValue,
    }));
    this.getMovies();
  }

  getMovies() {
    if (this.filterAllMoviesSubscription()) {
      this.filterAllMoviesSubscription()?.unsubscribe();
    }
    if (this.filterOptionsSubscription()) {
      this.filterOptionsSubscription()?.unsubscribe();
    }

    if (this._moviesRepository.filterOptions().query) {
      this._moviesRepository.getMoviesByFilter().subscribe((response) => {
        console.log(response);
        this._moviesRepository.movies.set(response.results);
      });
    } else {
      this._moviesRepository.getAllMovies().subscribe((response) => {
        console.log(response);
        this._moviesRepository.movies.set(response.results);
      });
    }
  }

  get filterOptions() {
    return this._moviesRepository.filterOptions;
  }

  get movies() {
    return this._moviesRepository.movies;
  }

  ngOnInit(): void {
    this.getMovies();
    this._route.queryParams.subscribe((params) => {
      console.log('Params', params);
      if (params['query']) {
        this._moviesRepository.filterOptions.update((value) => ({
          ...value,
          page: 1,
          query: params['query'],
        }));
        this.getMovies();
      }
    });
  }
}
