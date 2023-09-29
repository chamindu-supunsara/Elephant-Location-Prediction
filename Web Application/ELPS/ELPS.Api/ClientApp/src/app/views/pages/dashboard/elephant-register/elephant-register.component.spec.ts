import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElephantRegisterComponent } from './elephant-register.component';

describe('ElephantRegisterComponent', () => {
  let component: ElephantRegisterComponent;
  let fixture: ComponentFixture<ElephantRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElephantRegisterComponent]
    });
    fixture = TestBed.createComponent(ElephantRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
