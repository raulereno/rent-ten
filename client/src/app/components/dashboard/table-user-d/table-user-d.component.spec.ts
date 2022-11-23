import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUserDComponent } from './table-user-d.component';

describe('TableUserDComponent', () => {
  let component: TableUserDComponent;
  let fixture: ComponentFixture<TableUserDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableUserDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableUserDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
