import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseQueryHttpOptions } from '@/shared/types/BaseQueryHttpOptions';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  private _http: HttpClient = inject(HttpClient);
  constructor() {}

  get baseUrl() {
    return environment.apiUrl;
  }

  getBaseUrl(url: string) {
    return `${environment.apiUrl}${url}`;
  }

  get<T = any>({ url, params }: BaseQueryHttpOptions) {
    const allUrl = this.getBaseUrl(url);
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${environment.apiKey}`,
      },
    };
    return this._http.get<T>(allUrl, {
      params: {
        ...params,
        language: 'es-CO',
      },
      ...options,
    });
  }

  post<T = any, B = any>({ url, params, body }: BaseQueryHttpOptions<B>) {
    const allUrl = this.getBaseUrl(url);
    return this._http.post<T>(allUrl, body, {
      params,
    });
  }
}
