import { TestBed } from '@angular/core/testing';

import { LasttokenNICService } from './lasttoken-nic.service';

describe('LasttokenNICService', () => {
  let service: LasttokenNICService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LasttokenNICService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
