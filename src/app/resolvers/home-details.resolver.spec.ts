import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { homeDetailsResolver } from './home-details.resolver';

describe('homeDetailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => homeDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
