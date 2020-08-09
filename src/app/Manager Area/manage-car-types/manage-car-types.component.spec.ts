import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCarTypesComponent } from './manage-car-types.component';

describe('ManageCarTypesComponent', () => {
  let component: ManageCarTypesComponent;
  let fixture: ComponentFixture<ManageCarTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCarTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCarTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
