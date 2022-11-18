import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerMPComponent } from './container-mp.component';

describe('ContainerMPComponent', () => {
  let component: ContainerMPComponent;
  let fixture: ComponentFixture<ContainerMPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerMPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerMPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
