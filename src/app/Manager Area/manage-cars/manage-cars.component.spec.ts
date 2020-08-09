import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCarsComponent } from './manage-cars.component';

describe('ManageCarsComponent', () => {
  let component: ManageCarsComponent;
  let fixture: ComponentFixture<ManageCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
