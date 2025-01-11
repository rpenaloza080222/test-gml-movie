import { Component, input, output } from '@angular/core';
import { PaginationOptions } from '../movie-list-grid/movie-list-grid.component';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  next = output<void>();
  prev = output<void>();
  filterOptions = input<Partial<PaginationOptions>>({});
}
