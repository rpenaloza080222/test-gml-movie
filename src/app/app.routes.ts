import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "movie/:id",
    loadComponent: () => import('./pages/movie-detail/movie-detail.component').then((c) => c.MovieDetailComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: "**",
    redirectTo: ""
  }
];
