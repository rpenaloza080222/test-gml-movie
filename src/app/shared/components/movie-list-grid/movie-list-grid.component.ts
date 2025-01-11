import { Movie } from '@/features/movies/domain/interfaces/Movie';
import { MovieTrendComponent } from '@/features/movies/ui/components/movie-trend/movie-trend.component';
import { Component, input, output } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { MoviesFilter } from '@/features/movies/domain/repositories/movies.repository';

export type PaginationOptions = {
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
};

@Component({
  selector: 'app-movie-list-grid',
  imports: [MovieTrendComponent, PaginationComponent],
  templateUrl: './movie-list-grid.component.html',
  styleUrl: './movie-list-grid.component.css',
})
export class MovieListGridComponent {
  movies = input<Movie[]>([]);
  filterOptions = input<Partial<PaginationOptions>>({});
  handlePrev = output<void>();
  handleNext = output<void>();

  next() {
    this.handleNext.emit();
  }

  prev() {
    this.handlePrev.emit();
  }
}
