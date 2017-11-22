import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskLeaveFormComponent } from './ask-leave-form.component';

describe('AskLeaveFormComponent', () => {
  let component: AskLeaveFormComponent;
  let fixture: ComponentFixture<AskLeaveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskLeaveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskLeaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
