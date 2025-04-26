import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { allProductsResolver } from './all-products.resolver';

describe('allProductsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => allProductsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
