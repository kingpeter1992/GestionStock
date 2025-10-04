import { TestBed } from '@angular/core/testing';

import { StorageAuth } from './storage-auth';

describe('StorageAuth', () => {
  let service: StorageAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
