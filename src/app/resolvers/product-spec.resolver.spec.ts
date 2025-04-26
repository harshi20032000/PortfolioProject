import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { productSpecResolver } from './product-spec.resolver';

describe('productSpecResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => productSpecResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
