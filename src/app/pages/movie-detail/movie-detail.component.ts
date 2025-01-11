import { Movie } from '@/features/movies/domain/interfaces/Movie';
import { Cast } from '@/features/movies/domain/interfaces/ResponseCredits';
import {
  Result,
  VideoType,
} from '@/features/movies/domain/interfaces/ResponseVideos';
import { MoviesRepositoryImpl } from '@/features/movies/infrastructure/repositories/movies.repository.impl';
import { ErrorHttpHandlerComponent } from '@/shared/components/error-http-handler/error-http-handler.component';
import { ImageComponent } from '@/shared/components/image/image.component';
import {
  MovieListGridComponent,
  PaginationOptions,
} from '@/shared/components/movie-list-grid/movie-list-grid.component';
import { ImageUrlResolutionPipe } from '@/shared/pipes/image-url-resolution.pipe';
import { DatePipe, DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  imports: [
    DatePipe,
    DecimalPipe,
    MovieListGridComponent,
    ImageUrlResolutionPipe,
    ErrorHttpHandlerComponent,
    ImageComponent,
  ],

  providers: [MoviesRepositoryImpl, Title, Meta],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  errorHttp = signal<HttpErrorResponse | undefined>(undefined);
  private _movieService = inject(MoviesRepositoryImpl);
  id = signal<number>(0);
  titleProvider = inject(Title);
  metaProvider = inject(Meta);
  movie = signal<Movie | undefined>(undefined);
  similarMovies = signal<Movie[]>([]);
  similarFilterOptions = signal<Partial<PaginationOptions>>({});
  movieCredits = signal<Cast[]>([]);
  videos = signal<Result[]>([]);
  video = signal<Result | undefined>(undefined);
  sanitizerProvider = inject(DomSanitizer);

  getBackdropUrl() {
    const url = `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${
      this.movie()?.backdrop_path
    }`;
    return url;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      if (params['id']) {
        this.id.set(Number(params['id']));
        this.similarFilterOptions.update((value) => ({
          ...value,
          page: 1,
        }));
        this.getMovieDetail();
      }
    });
  }

  getMovieDetail() {
    this._movieService.getMovieById(this.id()).subscribe({
      next: (res) => {
        if (res) {
          console.log('Movie', res);
          this.movie.set(res);
          this.getSimilarMovies();
          this.getMovieCredits();
          this.getVideos();
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
      },
      error: (err) => {
        console.log('Error detail', err);

        this.errorHttp.set(err);
        if (err.status === 0) {
          console.log('Network Error', err);
        }
        if (err.status === 404) {
          console.log('Not Found', err);
        }
        if (err.status === 500) {
          console.log('Internal Server Error', err);
        }
      },
    });
  }

  getMovieCredits() {
    this._movieService.getMovieCredits(this.id()).subscribe({
      next: (res) => {
        if (res) {
          console.log('Movie Credits', res);
          this.movieCredits.set(res.cast);
        }
      },
      error: (err) => {
        console.log('Error credits', err);
        this.errorHttp.set(err);
        if (err.status === 0) {
          console.log('Network Error', err);
        }
        if (err.status === 404) {
          console.log('Not Found', err);
        }
        if (err.status === 500) {
          console.log('Internal Server Error', err);
        }
      },
    });
  }

  handlePrev() {
    const currentPage = this.similarFilterOptions()?.page ?? 0;

    if (currentPage === 1) return;

    this.similarFilterOptions.update((value) => ({
      ...value,
      page: (this.similarFilterOptions()?.page ?? 0) - 1,
    }));

    this.getSimilarMovies();
  }

  handleNext() {
    const totalPages = this.similarFilterOptions()?.totalPages ?? 0;
    const currentPage = this.similarFilterOptions()?.page ?? 0;

    if (currentPage + 1 > totalPages) return;

    this.similarFilterOptions.update((value) => ({
      ...value,
      page: (this.similarFilterOptions()?.page ?? 0) + 1,
    }));

    this.getSimilarMovies();
  }

  getSimilarMovies() {
    this._movieService
      .getSimilarMovies(this.id(), this.similarFilterOptions())
      .subscribe({
        next: (res) => {
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
        },
        error: (err) => {
          console.log('Error similar', err);
          this.errorHttp.set(err);
          if (err.status === 0) {
            console.log('Network Error', err);
          }
          if (err.status === 404) {
            console.log('Not Found', err);
          }
          if (err.status === 500) {
            console.log('Internal Server Error', err);
          }
        },
      });
  }

  getVideos() {
    this._movieService.getMovieVideos(this.id()).subscribe({
      next: (res) => {
        if (res) {
          console.log('Videos', res);
          this.videos.set(res.results);
          const video = this.videos().find((v) => v.type === VideoType.Clip);
          if (video) {
            console.log('Video', video);
            this.video.set(video);
          } else {
            const videoTrailer = this.videos().find(
              (v) => v.type === VideoType.Trailer
            );
            if (videoTrailer) {
              console.log('Video', videoTrailer);
              this.video.set(videoTrailer);
            }
          }
        }
      },
      error: (err) => {
        console.log('Error videos', err);
        this.errorHttp.set(err);
        if (err.status === 0) {
          console.log('Network Error', err);
        }
        if (err.status === 404) {
          console.log('Not Found', err);
        }
        if (err.status === 500) {
          console.log('Internal Server Error', err);
        }
      },
    });
  }

  getVideoUrl() {
    let videoUrl = '';
    if (!this.video()) videoUrl = '';
    if (this.video()) {
      const videoKey = this.video()?.key;
      console.log('Video Key', videoKey);
      const unsafeUrl = `https://www.youtube.com/embed/${videoKey}?si=v3cPuDrYWYW0P5GH`;
      videoUrl = unsafeUrl;
      console.log('Video Url', videoUrl);
    }
    return this.sanitizeValue(videoUrl);
  }

  sanitizeValue(value: string) {
    return this.sanitizerProvider.bypassSecurityTrustResourceUrl(value);
  }
}
