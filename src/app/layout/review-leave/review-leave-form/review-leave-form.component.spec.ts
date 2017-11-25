import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewLeaveFormComponent } from './review-leave-form.component';

describe('ReviewLeaveFormComponent', () => {
  let component: ReviewLeaveFormComponent;
  let fixture: ComponentFixture<ReviewLeaveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewLeaveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewLeaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
