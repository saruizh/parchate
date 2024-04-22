import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupIncorrectNICComponent } from './popup-incorrect-nic.component';

describe('PopupIncorrectNICComponent', () => {
  let component: PopupIncorrectNICComponent;
  let fixture: ComponentFixture<PopupIncorrectNICComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupIncorrectNICComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupIncorrectNICComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
