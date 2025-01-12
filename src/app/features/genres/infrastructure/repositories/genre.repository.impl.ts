import { inject, Injectable } from '@angular/core';
import { GenreRepository } from '../../domain/repositories/genre.repository';
import { GenreService } from '../services/genre.service';
import { PaginationOptions } from '@/shared/components/movie-list-grid/movie-list-grid.component';

@Injectable({
  providedIn: 'root',
})
export class GenreRepositoryImpl implements GenreRepository {
  private _genreService = inject(GenreService);

  getGenres() {
    return this._genreService.getGenres();
  }

  getGenreMovies(genreId: number, options: Partial<PaginationOptions>) {
    return this._genreService.getGenreMovies(genreId, options);
  }
}
