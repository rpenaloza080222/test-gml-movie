import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { MoviesRepository } from '../../domain/repositories/movies.repository';
import { ResponseTrendingMovie } from '../../domain/interfaces/ResponseTrendingMovies';
import { MoviesService } from '../services/movies.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesRepositoryImpl implements MoviesRepository {
  private _moviesServices: MoviesService = inject(MoviesService);

  getTrendingMovies(): Observable<ResponseTrendingMovie> {
    return this._moviesServices.getTrendingMovies();
  }
}
