import { TestBed } from '@angular/core/testing';

import { UsersguardGuard } from './usersguard.guard';

describe('UsersguardGuard', () => {
  let guard: UsersguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsersguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
