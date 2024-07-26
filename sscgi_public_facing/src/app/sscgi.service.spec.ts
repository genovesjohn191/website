import { TestBed } from '@angular/core/testing';

import { SscgiService } from './sscgi.service';

describe('SscgiService', () => {
  let service: SscgiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SscgiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
