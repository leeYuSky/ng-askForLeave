import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskOvertimeDraftComponent } from './ask-overtime-draft.component';

describe('AskOvertimeDraftComponent', () => {
  let component: AskOvertimeDraftComponent;
  let fixture: ComponentFixture<AskOvertimeDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskOvertimeDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskOvertimeDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
