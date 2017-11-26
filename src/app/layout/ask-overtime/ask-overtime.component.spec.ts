import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskOvertimeComponent } from './ask-overtime.component';

describe('AskOvertimeComponent', () => {
  let component: AskOvertimeComponent;
  let fixture: ComponentFixture<AskOvertimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskOvertimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
