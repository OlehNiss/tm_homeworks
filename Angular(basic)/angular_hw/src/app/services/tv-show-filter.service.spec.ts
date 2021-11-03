import { TestBed } from '@angular/core/testing';

import { TvShowFilterService } from './tv-show-filter.service';

describe('TvShowFilterService', () => {
  let service: TvShowFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvShowFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
