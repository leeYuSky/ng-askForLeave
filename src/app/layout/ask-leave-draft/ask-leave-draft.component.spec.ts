import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskLeaveDraftComponent } from './ask-leave-draft.component';

describe('AskLeaveDraftComponent', () => {
  let component: AskLeaveDraftComponent;
  let fixture: ComponentFixture<AskLeaveDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskLeaveDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskLeaveDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
