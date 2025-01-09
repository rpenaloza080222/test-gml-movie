import { Component } from '@angular/core';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { ListMovieTrendComponent } from './features/movies/ui/components/list-movie-trend/list-movie-trend.component';
import { ListMoviesComponent } from './features/movies/ui/components/list-movies/list-movies.component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterOutlet,
    ListMovieTrendComponent,
    ListMoviesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'prueba-gml-movies';
}
