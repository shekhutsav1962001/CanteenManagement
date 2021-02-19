import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VieworderComponent } from './vieworder.component';

describe('VieworderComponent', () => {
  let component: VieworderComponent;
  let fixture: ComponentFixture<VieworderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VieworderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VieworderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
