import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVirtualScrollerComponent } from './ngx-virtual-scroller.component';

describe('NgxVirtualScrollerComponent', () => {
  let component: NgxVirtualScrollerComponent;
  let fixture: ComponentFixture<NgxVirtualScrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxVirtualScrollerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxVirtualScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
