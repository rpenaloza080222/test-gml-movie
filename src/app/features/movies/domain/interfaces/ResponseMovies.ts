import { Movie } from './Movie';

export type ResponseMovies = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
