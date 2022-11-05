import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHouseComponent } from './create-house.component';

describe('CreateHouseComponent', () => {
  let component: CreateHouseComponent;
  let fixture: ComponentFixture<CreateHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
