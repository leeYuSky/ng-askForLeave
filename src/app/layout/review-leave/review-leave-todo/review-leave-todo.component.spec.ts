import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewLeaveTodoComponent } from './review-leave-todo.component';

describe('ReviewLeaveTodoComponent', () => {
  let component: ReviewLeaveTodoComponent;
  let fixture: ComponentFixture<ReviewLeaveTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewLeaveTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewLeaveTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
