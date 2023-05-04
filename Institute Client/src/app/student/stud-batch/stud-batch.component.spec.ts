import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudBatchComponent } from './stud-batch.component';

describe('StudBatchComponent', () => {
  let component: StudBatchComponent;
  let fixture: ComponentFixture<StudBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudBatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
