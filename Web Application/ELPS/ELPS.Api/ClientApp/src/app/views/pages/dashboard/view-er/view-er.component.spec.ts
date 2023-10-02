import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewErComponent } from './view-er.component';
import { HttpClientModule } from '@angular/common/http';

describe('ViewErComponent', () => {
  let component: ViewErComponent;
  let fixture: ComponentFixture<ViewErComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
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
