import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContributorFormComponent } from './update-contributor-form.component';

describe('UpdateContributorFormComponent', () => {
  let component: UpdateContributorFormComponent;
  let fixture: ComponentFixture<UpdateContributorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateContributorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateContributorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
