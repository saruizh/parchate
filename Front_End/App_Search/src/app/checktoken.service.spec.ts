import { TestBed } from '@angular/core/testing';

import { ChecktokenService } from './checktoken.service';

describe('ChecktokenService', () => {
  let service: ChecktokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecktokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
