import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffClassComponent } from './staff-class.component';

describe('StaffClassComponent', () => {
  let component: StaffClassComponent;
  let fixture: ComponentFixture<StaffClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
