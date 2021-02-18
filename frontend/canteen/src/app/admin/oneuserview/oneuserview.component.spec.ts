import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneuserviewComponent } from './oneuserview.component';

describe('OneuserviewComponent', () => {
  let component: OneuserviewComponent;
  let fixture: ComponentFixture<OneuserviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneuserviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneuserviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
