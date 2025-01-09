import { Movie } from '@/features/movies/domain/interfaces/Movie';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-movie-trend',
  imports: [],
  templateUrl: './movie-trend.component.html',
  styleUrl: './movie-trend.component.css',
})
export class MovieTrendComponent {
  movie = input<Movie | undefined>();
}
