import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpsiContributorFormComponent } from './epsi-contributor-form.component';

describe('EpsiContributorFormComponent', () => {
  let component: EpsiContributorFormComponent;
  let fixture: ComponentFixture<EpsiContributorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpsiContributorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpsiContributorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
