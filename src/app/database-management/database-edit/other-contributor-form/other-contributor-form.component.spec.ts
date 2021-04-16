import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherContributorFormComponent } from './other-contributor-form.component';

describe('OtherContributorFormComponent', () => {
  let component: OtherContributorFormComponent;
  let fixture: ComponentFixture<OtherContributorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherContributorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherContributorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
