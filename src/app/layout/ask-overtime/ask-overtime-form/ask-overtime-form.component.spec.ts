import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskOvertimeFormComponent } from './ask-overtime-form.component';

describe('AskOvertimeFormComponent', () => {
  let component: AskOvertimeFormComponent;
  let fixture: ComponentFixture<AskOvertimeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskOvertimeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskOvertimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
