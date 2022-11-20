import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativehomeComponent } from './alternativehome.component';

describe('AlternativehomeComponent', () => {
  let component: AlternativehomeComponent;
  let fixture: ComponentFixture<AlternativehomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlternativehomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlternativehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
