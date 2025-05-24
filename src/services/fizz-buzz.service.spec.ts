import { TestBed } from '@angular/core/testing';

import { FizzBuzzService } from './fizz-buzz.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FizzBuzzService', () => {
  let service: FizzBuzzService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(FizzBuzzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
