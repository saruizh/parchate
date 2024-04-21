import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDownloadbaseComponent } from './popup-downloadbase.component';

describe('PopupDownloadbaseComponent', () => {
  let component: PopupDownloadbaseComponent;
  let fixture: ComponentFixture<PopupDownloadbaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupDownloadbaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupDownloadbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
