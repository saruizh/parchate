import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logauthGuard } from './logauth.guard';

describe('logauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
