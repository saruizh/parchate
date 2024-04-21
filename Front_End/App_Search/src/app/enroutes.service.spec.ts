import { TestBed } from '@angular/core/testing';

import { EnroutesService } from './enroutes.service';

describe('EnroutesService', () => {
  let service: EnroutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnroutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
