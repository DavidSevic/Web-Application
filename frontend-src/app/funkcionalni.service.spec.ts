import { TestBed } from '@angular/core/testing';

import { FunkcionalniService } from './funkcionalni.service';

describe('FunkcionalniService', () => {
  let service: FunkcionalniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunkcionalniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
