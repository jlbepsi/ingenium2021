import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivippeComponent } from './suivippe.component';

describe('SuivippeComponent', () => {
  let component: SuivippeComponent;
  let fixture: ComponentFixture<SuivippeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuivippeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuivippeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
