import { TestBed } from '@angular/core/testing';

import { NekretnineService } from './nekretnine.service';

describe('NekretnineService', () => {
  let service: NekretnineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NekretnineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
