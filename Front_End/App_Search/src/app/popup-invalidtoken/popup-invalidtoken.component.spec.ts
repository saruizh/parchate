import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupInvalidtokenComponent } from './popup-invalidtoken.component';

describe('PopupInvalidtokenComponent', () => {
  let component: PopupInvalidtokenComponent;
  let fixture: ComponentFixture<PopupInvalidtokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupInvalidtokenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupInvalidtokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
