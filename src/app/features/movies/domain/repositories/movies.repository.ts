import { Observable } from 'rxjs';
import { ResponseMovies } from '../interfaces/ResponseMovies';
import { Movie } from '../interfaces/Movie';

export type MoviesFilter = {
  page: number;
  sort_by?: string;
  query?: string;
};

export interface ResponseCredits {
  id: number;
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
}

export abstract class MoviesRepository {
  abstract getTrendingMovies(): Observable<ResponseMovies>;
  abstract getAllMovies(filter: MoviesFilter): Observable<ResponseMovies>;
  abstract getMoviesByFilter(filter: MoviesFilter): Observable<ResponseMovies>;
  abstract getMovieById(id: number): Observable<Movie>;
  abstract getSimilarMovies(id: number): Observable<ResponseMovies>;
  abstract getMovieCredits(id: number): Observable<ResponseCredits>;
}
