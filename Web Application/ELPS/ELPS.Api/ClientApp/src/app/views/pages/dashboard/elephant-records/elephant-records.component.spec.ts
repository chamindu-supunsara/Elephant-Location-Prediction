import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElephantRecordsComponent } from './elephant-records.component';
import { HttpClientModule } from '@angular/common/http';

describe('ElephantRecordsComponent', () => {
  let component: ElephantRecordsComponent;
  let fixture: ComponentFixture<ElephantRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ElephantRecordsComponent]
    });
    fixture = TestBed.createComponent(ElephantRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
