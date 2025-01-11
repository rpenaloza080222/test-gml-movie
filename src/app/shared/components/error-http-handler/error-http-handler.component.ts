import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-error-http-handler',
  imports: [],
  templateUrl: './error-http-handler.component.html',
  styleUrl: './error-http-handler.component.css',
})
export class ErrorHttpHandlerComponent {
  error = input<HttpErrorResponse | undefined>();
  message = input<string>('');
  errorMessage = computed(() => {
    const error = this.error();
    if (!error) return '';

    if (error.error?.message) {
      return error?.error?.message;
    }
    if (error.status === 404) {
      return 'No se encontró la página';
    }
    return 'Ha ocurrido un error';
  });
  imageByStatusCode = computed(() => {
    const error = this.error();
    if (!error) return '';
    if (error.status === 404) {
      return '/assets/images/404.png';
    }
    if (error.status === 0) {
      return '/assets/images/network_error.png';
    }
    return '/assets/images/server_error.png';
  });
}
