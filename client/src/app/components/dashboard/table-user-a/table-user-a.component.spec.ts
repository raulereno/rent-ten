import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUserAComponent } from './table-user-a.component';

describe('TableUserAComponent', () => {
  let component: TableUserAComponent;
  let fixture: ComponentFixture<TableUserAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableUserAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableUserAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
