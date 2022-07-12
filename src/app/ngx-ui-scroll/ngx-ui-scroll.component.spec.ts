import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUiScrollComponent } from './ngx-ui-scroll.component';

describe('NgxUiScrollComponent', () => {
  let component: NgxUiScrollComponent;
  let fixture: ComponentFixture<NgxUiScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxUiScrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxUiScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
