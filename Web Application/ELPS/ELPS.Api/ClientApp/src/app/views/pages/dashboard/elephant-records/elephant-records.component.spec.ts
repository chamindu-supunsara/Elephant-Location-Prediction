import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElephantRecordsComponent } from './elephant-records.component';

describe('ElephantRecordsComponent', () => {
  let component: ElephantRecordsComponent;
  let fixture: ComponentFixture<ElephantRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
