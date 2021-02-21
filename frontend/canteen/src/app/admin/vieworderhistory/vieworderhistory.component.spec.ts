import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VieworderhistoryComponent } from './vieworderhistory.component';

describe('VieworderhistoryComponent', () => {
  let component: VieworderhistoryComponent;
  let fixture: ComponentFixture<VieworderhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VieworderhistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VieworderhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
