import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomersComponent } from './view-customers.component';

describe('ViewCustomersComponent', () => {
  let component: ViewCustomersComponent;
  let fixture: ComponentFixture<ViewCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
