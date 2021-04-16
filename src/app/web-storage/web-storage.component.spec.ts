import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebStorageComponent } from './web-storage.component';

describe('WebStorageComponent', () => {
  let component: WebStorageComponent;
  let fixture: ComponentFixture<WebStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
