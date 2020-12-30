import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexnavbarComponent } from './indexnavbar.component';

describe('IndexnavbarComponent', () => {
  let component: IndexnavbarComponent;
  let fixture: ComponentFixture<IndexnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexnavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
