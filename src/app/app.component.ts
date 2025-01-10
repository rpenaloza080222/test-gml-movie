import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GenreRepositoryImpl } from './features/genres/infrastructure/repositories/genre.repository.impl';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [FooterComponent, NavbarComponent, RouterOutlet],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'prueba-gml-movies';
}
