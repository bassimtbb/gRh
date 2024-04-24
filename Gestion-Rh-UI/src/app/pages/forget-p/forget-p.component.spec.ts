import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPComponent } from './forget-p.component';

describe('ForgetPComponent', () => {
  let component: ForgetPComponent;
  let fixture: ComponentFixture<ForgetPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgetPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgetPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
