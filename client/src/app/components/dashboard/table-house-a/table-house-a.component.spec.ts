import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHouseAComponent } from './table-house-a.component';

describe('TableHouseAComponent', () => {
  let component: TableHouseAComponent;
  let fixture: ComponentFixture<TableHouseAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableHouseAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableHouseAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
