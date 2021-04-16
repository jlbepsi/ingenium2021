import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewContributorComponent } from './dialog-new-contributor.component';

describe('DialogNewContributorComponent', () => {
  let component: DialogNewContributorComponent;
  let fixture: ComponentFixture<DialogNewContributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewContributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewContributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
