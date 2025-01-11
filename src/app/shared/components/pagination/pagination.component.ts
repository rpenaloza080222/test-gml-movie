import { Component, effect, input, OnInit, output } from '@angular/core';
import { PaginationOptions } from '../movie-list-grid/movie-list-grid.component';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  next = output<void>();
  prev = output<void>();
  filterOptions = input<Partial<PaginationOptions>>({});

  constructor() {
    effect(() => {
      console.log('Pagination Component', this.filterOptions());
    });
  }

  getTotalPages() {
    return this.filterOptions().totalPages;
  }

  ngOnInit(): void {
    console.log('Pagination Component', this.filterOptions());
  }

  /**
   * Emit the next event.
   *
   * This method is called by the template when the next button is clicked.
   * It emits the next event to the parent component, which will then update
   * the filter options and query the movies API.
   */
  handleNext() {
    console.log('Pagination Next');
    this.next.emit();
  }

  handlePrev() {
    this.prev.emit();
  }
}
