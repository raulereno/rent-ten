import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativehouseComponent } from './alternativehouse.component';

describe('AlternativehouseComponent', () => {
  let component: AlternativehouseComponent;
  let fixture: ComponentFixture<AlternativehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlternativehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlternativehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
