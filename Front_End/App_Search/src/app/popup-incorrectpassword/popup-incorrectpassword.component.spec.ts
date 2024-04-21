import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupIncorrectpasswordComponent } from './popup-incorrectpassword.component';

describe('PopupIncorrectpasswordComponent', () => {
  let component: PopupIncorrectpasswordComponent;
  let fixture: ComponentFixture<PopupIncorrectpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupIncorrectpasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupIncorrectpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
