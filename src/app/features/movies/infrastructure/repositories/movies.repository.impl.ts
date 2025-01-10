import { inject, Injectable, signal } from '@angular/core';

import { Observable } from 'rxjs';
import {
  MoviesFilter,
  MoviesRepository,
} from '../../domain/repositories/movies.repository';
import { ResponseMovies } from '../../domain/interfaces/ResponseMovies';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../../domain/interfaces/Movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesRepositoryImpl implements MoviesRepository {
  private _moviesServices: MoviesService = inject(MoviesService);
  movies = signal<Movie[]>([]);
  filterOptions = signal<MoviesFilter>({ page: 1, query: '' });

  getTrendingMovies(): Observable<ResponseMovies> {
    return this._moviesServices.getTrendingMovies();
  }

  getAllMovies(): Observable<ResponseMovies> {
    return this._moviesServices.getAllMovies(this.filterOptions());
  }

  getMoviesByFilter(): Observable<ResponseMovies> {
    console.log('Filters', this.filterOptions());
    return this._moviesServices.getMoviesByFilter(this.filterOptions());
  }
}
