import { GenreRepositoryImpl } from '@/features/genres/infrastructure/repositories/genre.repository.impl';
import { Movie } from '@/features/movies/domain/interfaces/Movie';
import {
  MovieListGridComponent,
  PaginationOptions,
} from '@/shared/components/movie-list-grid/movie-list-grid.component';
import { Component, effect, inject, input, signal } from '@angular/core';
import { sign } from 'crypto';

@Component({
  selector: 'app-genre-movie-list',
  imports: [MovieListGridComponent],
  providers: [GenreRepositoryImpl],
  templateUrl: './genre-movie-list.component.html',
  styleUrl: './genre-movie-list.component.css',
})
export class GenreMovieListComponent {
  genreId = input<number>();
  private _genreRepository: GenreRepositoryImpl = inject(GenreRepositoryImpl);
  movies = signal<Movie[]>([]);
  paginationOptions = signal<Partial<PaginationOptions>>({
    page: 1,
    totalPages: 1,
    pageSize: 20,
    total: 0,
  });
  loading = signal<boolean>(false);

  constructor() {}

  next() {
    if (this.paginationOptions().page === this.paginationOptions().totalPages)
      return;
    this.paginationOptions.update((options) => ({
      ...options,
      page: (options?.page ?? 0) + 1,
    }));
    this.getGenreMovies(this.paginationOptions());
  }

  prev() {
    if (this.paginationOptions().page === 1) return;
    this.paginationOptions.update((options) => ({
      ...options,
      page: (options?.page ?? 0) - 1,
    }));
    this.getGenreMovies(this.paginationOptions());
  }

  ngOnInit(): void {
    this.getGenreMovies();
  }

  getGenreMovies(options: Partial<PaginationOptions> = { page: 1 }) {
    this.loading.set(true);
    this._genreRepository
      .getGenreMovies(this.genreId() ?? 0, options)
      .subscribe({
        next: (response) => {
          console.log('Movies', response);
          this.movies.set(response.results);
          this.loading.set(false);
          this.paginationOptions.update((options) => ({
            ...options,
            page: response.page,
            totalPages: response.total_pages,
            total: response.total_results,
          }));
        },
        error: (error) => {
          console.log('Error', error);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
  }
}
