import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskOvertimeUpdateFormComponent } from './ask-overtime-update-form.component';

describe('AskOvertimeUpdateFormComponent', () => {
  let component: AskOvertimeUpdateFormComponent;
  let fixture: ComponentFixture<AskOvertimeUpdateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskOvertimeUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskOvertimeUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
