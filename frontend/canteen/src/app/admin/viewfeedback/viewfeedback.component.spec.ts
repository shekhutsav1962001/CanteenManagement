import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfeedbackComponent } from './viewfeedback.component';

describe('ViewfeedbackComponent', () => {
  let component: ViewfeedbackComponent;
  let fixture: ComponentFixture<ViewfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewfeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
