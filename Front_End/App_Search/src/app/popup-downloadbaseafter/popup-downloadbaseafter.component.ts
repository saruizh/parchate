import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-downloadbaseafter',
  standalone: true,
  imports: [],
  templateUrl: './popup-downloadbaseafter.component.html',
  styleUrl: './popup-downloadbaseafter.component.css'
})
export class PopupDownloadbaseafterComponent {
  constructor(
    public dialogRef2: MatDialogRef<PopupDownloadbaseafterComponent>) {}

  onNoClick(): void {
    this.dialogRef2.close();
  }

}
