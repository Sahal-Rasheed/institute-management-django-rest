import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProfileEditComponent } from './staff-profile-edit.component';

describe('StaffProfileEditComponent', () => {
  let component: StaffProfileEditComponent;
  let fixture: ComponentFixture<StaffProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffProfileEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
