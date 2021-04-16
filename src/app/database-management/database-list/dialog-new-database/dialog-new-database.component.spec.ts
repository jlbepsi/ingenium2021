import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewDatabaseComponent } from './dialog-new-database.component';

describe('DialogNewDatabaseComponent', () => {
  let component: DialogNewDatabaseComponent;
  let fixture: ComponentFixture<DialogNewDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewDatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
