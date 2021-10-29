import { TestBed } from '@angular/core/testing';

import { PorukeService } from './poruke.service';

describe('PorukeService', () => {
  let service: PorukeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorukeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
