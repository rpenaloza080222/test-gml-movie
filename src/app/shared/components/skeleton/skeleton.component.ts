import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  imports: [],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css',
})
export class SkeletonComponent {
  className = input.required<string>();
}
