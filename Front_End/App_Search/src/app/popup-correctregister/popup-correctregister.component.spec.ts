import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCorrectregisterComponent } from './popup-correctregister.component';

describe('PopupCorrectregisterComponent', () => {
  let component: PopupCorrectregisterComponent;
  let fixture: ComponentFixture<PopupCorrectregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupCorrectregisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupCorrectregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
