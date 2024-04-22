import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFormnewregisterComponent } from './popup-formnewregister.component';

describe('PopupFormnewregisterComponent', () => {
  let component: PopupFormnewregisterComponent;
  let fixture: ComponentFixture<PopupFormnewregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupFormnewregisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupFormnewregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
