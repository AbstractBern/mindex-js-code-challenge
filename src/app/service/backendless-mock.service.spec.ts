import { TestBed } from '@angular/core/testing';

import { BackendlessMockService } from './backendless-mock.service';

describe('BackendlessMockService', () => {
  let service: BackendlessMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendlessMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
