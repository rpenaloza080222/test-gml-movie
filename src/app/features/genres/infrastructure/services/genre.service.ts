import { HttpRequestService } from '@/shared/services/http-request.service';
import { inject, Injectable } from '@angular/core';
import { GenresResponse } from '../../domain/interfaces/Genre';
import { ResponseMovies } from '@/features/movies/domain/interfaces/ResponseMovies';
import { PaginationOptions } from '@/shared/components/movie-list-grid/movie-list-grid.component';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private _requestService = inject(HttpRequestService);

  constructor() {}

  getGenres() {
    return this._requestService.get<GenresResponse>({
      url: 'genre/movie/list',
    });
  }

  getGenreMovies(genreId: number, options: Partial<PaginationOptions>) {
    return this._requestService.get<ResponseMovies>({
      url: `discover/movie?with_genres=${genreId}`,
      params: {
        with_genres: genreId,
        ...options,
      },
    });
  }
}
