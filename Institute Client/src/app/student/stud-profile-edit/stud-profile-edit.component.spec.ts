import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudProfileEditComponent } from './stud-profile-edit.component';

describe('StudProfileEditComponent', () => {
  let component: StudProfileEditComponent;
  let fixture: ComponentFixture<StudProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudProfileEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
