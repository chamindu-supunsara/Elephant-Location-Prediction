import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewErecordComponent } from './view-erecord.component';
import { HttpClientModule } from '@angular/common/http';

describe('ViewErecordComponent', () => {
  let component: ViewErecordComponent;
  let fixture: ComponentFixture<ViewErecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ViewErecordComponent]
    });
    fixture = TestBed.createComponent(ViewErecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
