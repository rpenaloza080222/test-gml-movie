import { Observable } from 'rxjs';
import { ResponseMovies } from '../interfaces/ResponseMovies';

export type MoviesFilter = {
  page: number;
  sort_by?: string;
  query?: string;
};

export abstract class MoviesRepository {
  abstract getTrendingMovies(): Observable<ResponseMovies>;
  abstract getAllMovies(filter: MoviesFilter): Observable<ResponseMovies>;
  abstract getMoviesByFilter(filter: MoviesFilter): Observable<ResponseMovies>;
}
