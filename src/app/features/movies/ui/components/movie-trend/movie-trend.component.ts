import { Movie } from '@/features/movies/domain/interfaces/Movie';
import { ImageComponent } from '@/shared/components/image/image.component';
import { SkeletonComponent } from '@/shared/components/skeleton/skeleton.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-trend',
  imports: [DecimalPipe, ImageComponent, DatePipe, SkeletonComponent],
  templateUrl: './movie-trend.component.html',
  styleUrl: './movie-trend.component.css',
})
export class MovieTrendComponent implements OnInit {
  movie = input<Movie | undefined>();
  showRate = input<boolean>(true);
  usePortrait = input<boolean>(true);
  loading = input<boolean>(false);
  private router = inject(Router);

  getUrlImage() {
    if (!this.usePortrait()) {
      const url = `https://media.themoviedb.org/t/p/w355_and_h200_multi_faces${
        this.movie()?.backdrop_path
      }`;
      return url;
    }
    return `https://image.tmdb.org/t/p/w500${this.movie()?.poster_path}`;
  }

  goToMovieDetail() {
    this.router.navigate([`movie/${this.movie()?.id}`]);
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
}
