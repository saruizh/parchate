import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPosttokenComponent } from './popup-posttoken.component';

describe('PopupPosttokenComponent', () => {
  let component: PopupPosttokenComponent;
  let fixture: ComponentFixture<PopupPosttokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupPosttokenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupPosttokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
