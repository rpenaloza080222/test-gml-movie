import { HttpRequestService } from '@/shared/services/http-request.service';
import { inject, Injectable } from '@angular/core';
import { ResponseMovies } from '../../domain/interfaces/ResponseMovies';
import { MoviesFilter } from '../../domain/repositories/movies.repository';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private _request: HttpRequestService = inject(HttpRequestService);

  getTrendingMovies() {
    return this._request.get<ResponseMovies>({
      url: 'trending/movie/week',
      params: {
        page: 1,
      },
    });
  }

  getAllMovies({ page = 1, ...options }: MoviesFilter) {
    return this._request.get<ResponseMovies>({
      url: 'discover/movie',
      params: {
        page,
        ...options,
      },
    });
  }

  getMoviesByFilter({ page = 1, ...options }: MoviesFilter) {
    return this._request.get<ResponseMovies>({
      url: 'search/movie',
      params: {
        page,
        ...options,
      },
    });
  }
}
