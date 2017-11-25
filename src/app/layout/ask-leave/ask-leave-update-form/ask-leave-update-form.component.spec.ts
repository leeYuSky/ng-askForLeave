import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskLeaveUpdateFormComponent } from './ask-leave-update-form.component';

describe('AskLeaveUpdateFormComponent', () => {
  let component: AskLeaveUpdateFormComponent;
  let fixture: ComponentFixture<AskLeaveUpdateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskLeaveUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskLeaveUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
