import { TestBed } from '@angular/core/testing';

import { ConfirmEmailGuard } from './confirm-email.guard';

describe('ConfirmEmailGuard', () => {
  let guard: ConfirmEmailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfirmEmailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
