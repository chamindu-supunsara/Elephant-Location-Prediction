import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewErComponent } from './view-er.component';

describe('ViewErComponent', () => {
  let component: ViewErComponent;
  let fixture: ComponentFixture<ViewErComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewErComponent]
    });
    fixture = TestBed.createComponent(ViewErComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
