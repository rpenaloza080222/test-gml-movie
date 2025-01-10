import { Observable } from 'rxjs';
import { GenresResponse } from '../interfaces/Genre';

export abstract class GenreRepository {
  abstract getGenres(): Observable<GenresResponse>;
}
