import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerSelectionListComponent } from './server-selection-list.component';

describe('ServerSelectionListComponent', () => {
  let component: ServerSelectionListComponent;
  let fixture: ComponentFixture<ServerSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerSelectionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
