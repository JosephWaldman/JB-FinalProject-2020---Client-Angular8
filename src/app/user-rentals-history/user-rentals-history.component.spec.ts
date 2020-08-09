import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRentalsHistoryComponent } from './user-rentals-history.component';

describe('UserRentalsHistoryComponent', () => {
  let component: UserRentalsHistoryComponent;
  let fixture: ComponentFixture<UserRentalsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRentalsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRentalsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
