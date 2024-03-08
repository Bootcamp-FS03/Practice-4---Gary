import { TestBed } from '@angular/core/testing';

import { AddAuthorizationHeaderInterceptor } from './add-authorization-header.interceptor';

describe('AddAuthorizationHeaderInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AddAuthorizationHeaderInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: AddAuthorizationHeaderInterceptor = TestBed.inject(AddAuthorizationHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
