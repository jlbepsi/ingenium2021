import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntAddComponent } from './emprunt-add.component';

describe('EmpruntAddComponent', () => {
  let component: EmpruntAddComponent;
  let fixture: ComponentFixture<EmpruntAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpruntAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpruntAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
