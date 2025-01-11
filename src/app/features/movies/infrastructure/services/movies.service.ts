import { HttpRequestService } from '@/shared/services/http-request.service';
import { inject, Injectable } from '@angular/core';
import { ResponseMovies } from '../../domain/interfaces/ResponseMovies';
import { MoviesFilter } from '../../domain/repositories/movies.repository';
import { Movie } from '../../domain/interfaces/Movie';
import { ResponseCredits } from '../../domain/interfaces/ResponseCredits';
import { ResponseVideo } from '../../domain/interfaces/ResponseVideos';
import { PaginationOptions } from '@/shared/components/movie-list-grid/movie-list-grid.component';

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
    console.log('MoviesService getAllMovies', page, options);
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

  getMovieById(id: number) {
    return this._request.get<Movie>({
      url: `movie/${id}`,
    });
  }

  getSimilarMovies(id: number, options: Partial<PaginationOptions>) {
    return this._request.get<ResponseMovies>({
      url: `movie/${id}/similar`,
      params: {
        ...options,
      },
    });
  }

  getMovieCredits(id: number) {
    return this._request.get<ResponseCredits>({
      url: `movie/${id}/credits`,
    });
  }

  getMovieVideos(id: number) {
    return this._request.get<ResponseVideo>({
      url: `movie/${id}/videos`,
    });
  }
}
