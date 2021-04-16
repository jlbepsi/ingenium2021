import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionSelectionListComponent } from './permission-selection-list.component';

describe('PermissionSelectionListComponent', () => {
  let component: PermissionSelectionListComponent;
  let fixture: ComponentFixture<PermissionSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionSelectionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
