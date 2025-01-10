import { Genre } from '@/features/genres/domain/interfaces/Genre';
import { GenreRepositoryImpl } from '@/features/genres/infrastructure/repositories/genre.repository.impl';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-genre-list',
  imports: [],
  providers: [GenreRepositoryImpl],
  templateUrl: './genre-list.component.html',
  styleUrl: './genre-list.component.css',
})
export class GenreListComponent implements OnInit {
  private _genreRepository: GenreRepositoryImpl = inject(GenreRepositoryImpl);
  genres = signal<Genre[]>([]);

  get sliceGenres() {
    return this.genres().slice(0, 8);
  }

  ngOnInit(): void {
    this._genreRepository.getGenres().subscribe((response) => {
      console.log('Genre', response);
      this.genres.set(response.genres);
    });
  }
}
