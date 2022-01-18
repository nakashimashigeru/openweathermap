import { TestBed } from '@angular/core/testing';

import { SharedKaleidService } from './shared-kaleid.service';

describe('SharedKaleidService', () => {
  let service: SharedKaleidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedKaleidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
