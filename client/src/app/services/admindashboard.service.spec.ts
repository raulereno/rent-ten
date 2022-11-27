import { TestBed } from '@angular/core/testing';

import { AdmindashboardService } from './admindashboard.service';

describe('AdmindashboardService', () => {
  let service: AdmindashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmindashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
