import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskOvertimeDoneComponent } from './ask-overtime-done.component';

describe('AskOvertimeDoneComponent', () => {
  let component: AskOvertimeDoneComponent;
  let fixture: ComponentFixture<AskOvertimeDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskOvertimeDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskOvertimeDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
