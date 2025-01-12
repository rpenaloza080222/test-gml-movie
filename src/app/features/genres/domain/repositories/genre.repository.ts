import { Observable } from 'rxjs';
import { GenresResponse } from '../interfaces/Genre';
import { ResponseMovies } from '@/features/movies/domain/interfaces/ResponseMovies';
import { PaginationOptions } from '@/shared/components/movie-list-grid/movie-list-grid.component';

export abstract class GenreRepository {
  abstract getGenres(): Observable<GenresResponse>;
  abstract getGenreMovies(
    genreId: number,
    options: Partial<PaginationOptions>
  ): Observable<ResponseMovies>;
}
