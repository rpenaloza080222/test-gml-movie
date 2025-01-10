import { Component, inject, OnInit, signal } from '@angular/core';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ListMovieTrendComponent } from './features/movies/ui/components/list-movie-trend/list-movie-trend.component';
import { ListMoviesComponent } from './features/movies/ui/components/list-movies/list-movies.component';
import { GenreRepositoryImpl } from './features/genres/infrastructure/repositories/genre.repository.impl';
import { Genre } from './features/genres/domain/interfaces/Genre';
import { switchMap } from 'rxjs';
import { GenreListComponent } from './features/genres/ui/components/genre-list/genre-list.component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterOutlet,
    ListMovieTrendComponent,
    ListMoviesComponent,
    GenreListComponent,
  ],
  providers: [GenreRepositoryImpl, Router],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'prueba-gml-movies';
  router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private _genreRepository: GenreRepositoryImpl = inject(GenreRepositoryImpl);
  genres = signal<Genre[]>([]);

  ngOnInit(): void {
    this._genreRepository.getGenres().subscribe((response) => {
      console.log('Genre', response);
      this.genres.set(response.genres);
    });
    this.route.paramMap.subscribe((params) => {
      const id = params.get('query');
    });
  }

  get sliceGenres() {
    return this.genres().slice(0, 8);
  }
}
