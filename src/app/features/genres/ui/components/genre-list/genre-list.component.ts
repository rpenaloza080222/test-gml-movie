import { Genre } from '@/features/genres/domain/interfaces/Genre';
import { GenreRepositoryImpl } from '@/features/genres/infrastructure/repositories/genre.repository.impl';
import { SkeletonComponent } from '@/shared/components/skeleton/skeleton.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-genre-list',
  imports: [RouterLink, SkeletonComponent],
  providers: [GenreRepositoryImpl],
  templateUrl: './genre-list.component.html',
  styleUrl: './genre-list.component.css',
})
export class GenreListComponent implements OnInit {
  private _genreRepository: GenreRepositoryImpl = inject(GenreRepositoryImpl);
  genres = signal<Genre[]>([]);
  loading = signal<boolean>(true);

  get sliceGenres() {
    return this.genres().slice(0, 8);
  }

  get sliceGenresMock() {
    return Array.from({
      length: 6,
    });
  }

  ngOnInit(): void {
    this._genreRepository.getGenres().subscribe({
      next: (response) => {
        console.log('Genre', response);
        this.genres.set(response.genres);
        this.loading.set(false);
      },
      error: (error) => {
        console.log('Error', error);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
