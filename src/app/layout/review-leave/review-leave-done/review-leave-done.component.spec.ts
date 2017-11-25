import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewLeaveDoneComponent } from './review-leave-done.component';

describe('ReviewLeaveDoneComponent', () => {
  let component: ReviewLeaveDoneComponent;
  let fixture: ComponentFixture<ReviewLeaveDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewLeaveDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewLeaveDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
