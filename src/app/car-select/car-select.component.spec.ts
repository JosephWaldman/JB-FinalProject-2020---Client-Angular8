import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSelectComponent } from './car-select.component';

describe('CarSelectComponent', () => {
  let component: CarSelectComponent;
  let fixture: ComponentFixture<CarSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
