import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElephantRegisterComponent } from './elephant-register.component';
import { HttpClientModule } from '@angular/common/http';

describe('ElephantRegisterComponent', () => {
  let component: ElephantRegisterComponent;
  let fixture: ComponentFixture<ElephantRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
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
