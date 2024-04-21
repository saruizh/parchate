import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupIncorrectrangedateComponent } from './popup-incorrectrangedate.component';

describe('PopupIncorrectrangedateComponent', () => {
  let component: PopupIncorrectrangedateComponent;
  let fixture: ComponentFixture<PopupIncorrectrangedateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupIncorrectrangedateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupIncorrectrangedateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
