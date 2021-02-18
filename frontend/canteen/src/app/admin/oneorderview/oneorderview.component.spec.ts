import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneorderviewComponent } from './oneorderview.component';

describe('OneorderviewComponent', () => {
  let component: OneorderviewComponent;
  let fixture: ComponentFixture<OneorderviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneorderviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneorderviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
