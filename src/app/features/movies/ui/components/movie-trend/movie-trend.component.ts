import { Movie } from '@/features/movies/domain/interfaces/Movie';
import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-movie-trend',
  imports: [DecimalPipe],
  templateUrl: './movie-trend.component.html',
  styleUrl: './movie-trend.component.css',
})
export class MovieTrendComponent {
  movie = input<Movie | undefined>();
  showRate = input<boolean>(true);
  usePortrait = input<boolean>(true);

  getUrlImage() {
    if (!this.usePortrait()) {
      const url = `https://media.themoviedb.org/t/p/w355_and_h200_multi_faces${
        this.movie()?.backdrop_path
      }`;
      console.log('Url Image', url);
      return url;
    }
    return `https://image.tmdb.org/t/p/w500${this.movie()?.poster_path}`;
  }
}
