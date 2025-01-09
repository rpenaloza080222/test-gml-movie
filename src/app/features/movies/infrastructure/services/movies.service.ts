import { HttpRequestService } from '@/shared/services/http-request.service';
import { inject, Injectable } from '@angular/core';
import { ResponseTrendingMovie } from '../../domain/interfaces/ResponseTrendingMovies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private _request: HttpRequestService = inject(HttpRequestService);

  getTrendingMovies() {
    return this._request.get<ResponseTrendingMovie>({
      url: 'trending/movie/week',
      params: {
        page: 1,
      },
    });
  }
}
