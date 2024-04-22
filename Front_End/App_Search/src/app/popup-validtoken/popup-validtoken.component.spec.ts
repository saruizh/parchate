import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupValidtokenComponent } from './popup-validtoken.component';

describe('PopupValidtokenComponent', () => {
  let component: PopupValidtokenComponent;
  let fixture: ComponentFixture<PopupValidtokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupValidtokenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupValidtokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
