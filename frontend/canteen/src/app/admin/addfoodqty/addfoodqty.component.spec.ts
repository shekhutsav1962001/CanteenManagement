import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfoodqtyComponent } from './addfoodqty.component';

describe('AddfoodqtyComponent', () => {
  let component: AddfoodqtyComponent;
  let fixture: ComponentFixture<AddfoodqtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfoodqtyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfoodqtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
