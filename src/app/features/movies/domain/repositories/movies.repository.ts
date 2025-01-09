import { Observable } from 'rxjs';
import { ResponseTrendingMovie } from '../interfaces/ResponseTrendingMovies';

export abstract class MoviesRepository {
  abstract getTrendingMovies(): Observable<ResponseTrendingMovie>;
}
