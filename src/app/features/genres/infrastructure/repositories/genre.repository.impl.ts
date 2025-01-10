import { inject, Injectable } from '@angular/core';
import { GenreRepository } from '../../domain/repositories/genre.repository';
import { GenreService } from '../services/genre.service';

@Injectable({
  providedIn: 'root',
})
export class GenreRepositoryImpl implements GenreRepository {
  private _genreService = inject(GenreService);

  getGenres() {
    return this._genreService.getGenres();
  }
}
