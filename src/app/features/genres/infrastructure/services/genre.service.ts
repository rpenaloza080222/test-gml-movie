import { HttpRequestService } from '@/shared/services/http-request.service';
import { inject, Injectable } from '@angular/core';
import { GenresResponse } from '../../domain/interfaces/Genre';

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
}
