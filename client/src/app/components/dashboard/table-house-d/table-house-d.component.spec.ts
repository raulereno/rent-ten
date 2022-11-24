import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHouseDComponent } from './table-house-d.component';

describe('TableHouseDComponent', () => {
  let component: TableHouseDComponent;
  let fixture: ComponentFixture<TableHouseDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableHouseDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableHouseDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
