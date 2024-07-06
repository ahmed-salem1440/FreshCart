import { TestBed } from '@angular/core/testing';

import { AddheadersInterceptor } from './addheaders.interceptor';

describe('AddheadersInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddheadersInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AddheadersInterceptor = TestBed.inject(AddheadersInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
