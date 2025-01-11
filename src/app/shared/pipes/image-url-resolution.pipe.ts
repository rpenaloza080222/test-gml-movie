import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl',
})
export class ImageUrlResolutionPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (args[0]) {
      const size = args[0] as string;
      return `https://image.tmdb.org/t/p/${size}${value}`;
    }
    return `https://image.tmdb.org/t/p/original${value}`;
  }
}
