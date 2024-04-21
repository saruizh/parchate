import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupIncorrectregisterComponent } from './popup-incorrectregister.component';

describe('PopupIncorrectregisterComponent', () => {
  let component: PopupIncorrectregisterComponent;
  let fixture: ComponentFixture<PopupIncorrectregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupIncorrectregisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupIncorrectregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
