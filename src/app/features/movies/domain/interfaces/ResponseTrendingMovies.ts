import { Movie } from './Movie';

export type ResponseTrendingMovie = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
