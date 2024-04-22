import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDownloadbaseafterComponent } from './popup-downloadbaseafter.component';

describe('PopupDownloadbaseafterComponent', () => {
  let component: PopupDownloadbaseafterComponent;
  let fixture: ComponentFixture<PopupDownloadbaseafterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupDownloadbaseafterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupDownloadbaseafterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
