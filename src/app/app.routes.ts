import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./pages/movie-detail/movie-detail.component').then(
        (c) => c.MovieDetailComponent
      ),
  },
  {
    path: 'genre/:id',
    loadComponent: () =>
      import('./pages/genre/genre.component').then((c) => c.GenreComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
