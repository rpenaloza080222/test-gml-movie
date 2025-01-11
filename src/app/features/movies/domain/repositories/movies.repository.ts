import { Observable } from 'rxjs';
import { ResponseMovies } from '../interfaces/ResponseMovies';
import { Movie } from '../interfaces/Movie';
import { ResponseCredits } from '../interfaces/ResponseCredits';
import { ResponseVideo } from '../interfaces/ResponseVideos';
import { PaginationOptions } from '@/shared/components/movie-list-grid/movie-list-grid.component';

export type MoviesFilter = {
  page: number;
  sort_by?: string;
  query?: string;
};

export abstract class MoviesRepository {
  abstract getTrendingMovies(): Observable<ResponseMovies>;
  abstract getAllMovies(filter: MoviesFilter): Observable<ResponseMovies>;
  abstract getMoviesByFilter(filter: MoviesFilter): Observable<ResponseMovies>;
  abstract getMovieById(id: number): Observable<Movie>;
  abstract getSimilarMovies(
    id: number,
    options: Partial<PaginationOptions>
  ): Observable<ResponseMovies>;
  abstract getMovieCredits(id: number): Observable<ResponseCredits>;
  abstract getMovieVideos(id: number): Observable<ResponseVideo>;
}
