import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskLeaveDoneComponent } from './ask-leave-done.component';

describe('AskLeaveDoneComponent', () => {
  let component: AskLeaveDoneComponent;
  let fixture: ComponentFixture<AskLeaveDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskLeaveDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskLeaveDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
