import { GenreMovieListComponent } from '@/features/genres/ui/components/genre-movie-list/genre-movie-list.component';
import { Component, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genre',
  imports: [GenreMovieListComponent],
  providers: [Title],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css',
})
export class GenreComponent {
  private route = inject(ActivatedRoute);
  genreId = signal<number | undefined>(undefined);
  genre = signal<string | undefined>(undefined);

  private title = inject(Title);

  ngOnInit(): void {
    const genre = this.route.snapshot.paramMap.get('id') ?? '';
    const [id, name] = genre.split('-');
    this.title.setTitle(`Peliculas del Género ${id}`);
    this.genreId.set(Number(id ?? ''));
    this.genre.set(name ?? '');
  }
}
