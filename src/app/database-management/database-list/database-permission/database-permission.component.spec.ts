import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabasePermissionComponent } from './database-permission.component';

describe('DatabasePermissionComponent', () => {
  let component: DatabasePermissionComponent;
  let fixture: ComponentFixture<DatabasePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabasePermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabasePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
