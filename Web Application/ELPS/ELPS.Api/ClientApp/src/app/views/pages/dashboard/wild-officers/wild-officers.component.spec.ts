import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildOfficersComponent } from './wild-officers.component';

describe('WildOfficersComponent', () => {
  let component: WildOfficersComponent;
  let fixture: ComponentFixture<WildOfficersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WildOfficersComponent]
    });
    fixture = TestBed.createComponent(WildOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
