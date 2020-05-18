import { TestBed } from '@angular/core/testing';

import { ClimasService } from './climas.service';

describe('ClimasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClimasService = TestBed.get(ClimasService);
    expect(service).toBeTruthy();
  });
});
