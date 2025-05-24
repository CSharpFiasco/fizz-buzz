import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type FizzBuzzRequest = {
  multiples: {
    multiple: number;
    wordToPrint: string;
  }[];
  maxNumber: number;
}

export type FizzBuzzResponse = {
  [key: number]: string;
}

@Injectable({
  providedIn: 'root'
})
export class FizzBuzzService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getFizzBuzz(request: FizzBuzzRequest): Observable<FizzBuzzResponse> {
    return this.httpClient.post<FizzBuzzResponse>('https://fizz-buzz-api.carlosmartos.com', request);
  }
}
