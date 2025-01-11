import { Movie } from '@/features/movies/domain/interfaces/Movie';
import { Cast } from '@/features/movies/domain/repositories/movies.repository';
import { MoviesRepositoryImpl } from '@/features/movies/infrastructure/repositories/movies.repository.impl';
import {
  MovieListGridComponent,
  PaginationOptions,
} from '@/shared/components/movie-list-grid/movie-list-grid.component';
import { ImageUrlResolutionPipe } from '@/shared/pipes/image-url-resolution.pipe';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  imports: [
    DatePipe,
    DecimalPipe,
    MovieListGridComponent,
    ImageUrlResolutionPipe,
  ],

  providers: [MoviesRepositoryImpl, Title, Meta],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  private _movieService = inject(MoviesRepositoryImpl);
  id = signal<number>(0);
  titleProvider = inject(Title);
  metaProvider = inject(Meta);
  movie = signal<Movie | undefined>(undefined);
  similarMovies = signal<Movie[]>([]);
  similarFilterOptions = signal<Partial<PaginationOptions>>({});
  movieCredits = signal<Cast[]>([]);

  getBackdropUrl() {
    const url = `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${
      this.movie()?.backdrop_path
    }`;
    console.log('Url Image', url);
    return url;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      if (params['id']) {
        this.id.set(Number(params['id']));
        this.getMovieDetail();
        this.getSimilarMovies();
        this.getMovieCredits();
      }
    });
  }

  getMovieDetail() {
    this._movieService.getMovieById(this.id()).subscribe((res) => {
      if (res) {
        console.log('Movie', res);
        this.movie.set(res);
        this.titleProvider.setTitle(res.title);
        this.metaProvider.updateTag({
          name: 'description',
          content: res.overview,
        });
        //OpenGraph
        this.metaProvider.updateTag({
          property: 'og:title',
          content: res.title,
        });
        this.metaProvider.updateTag({
          property: 'og:description',
          content: res.overview,
        });
        this.metaProvider.updateTag({
          property: 'og:image',
          content: this.getBackdropUrl(),
        });
      }
    });
  }

  getMovieCredits() {
    this._movieService.getMovieCredits(this.id()).subscribe((res) => {
      if (res) {
        console.log('Movie Credits', res);
        this.movieCredits.set(res.cast);
      }
    });
  }

  getSimilarMovies() {
    this._movieService.getSimilarMovies(this.id()).subscribe((res) => {
      if (res) {
        console.log('Movies', res);
        this.similarMovies.set(res.results);
        this.similarFilterOptions.set({
          page: res.page,
          totalPages: res.total_pages,
          total: res.total_results,
          pageSize: 10,
        });
      }
    });
  }
}
