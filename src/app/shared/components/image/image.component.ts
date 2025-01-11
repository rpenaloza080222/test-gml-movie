import { Component, input, signal } from '@angular/core';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css',
})
export class ImageComponent {
  image = input<string>();
  alt = input<string>();
  className = input<string>();
  imageDefault = input<string>('/assets/images/image_default.png');
  imageLoaded = signal<boolean>(false);

  onLoad() {
    console.log('Image Loaded');
    this.imageLoaded.set(true);
  }
}
