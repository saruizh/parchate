import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-incorrectrangedate',
  standalone: true,
  imports: [],
  templateUrl: './popup-incorrectrangedate.component.html',
  styleUrl: './popup-incorrectrangedate.component.css'
})
export class PopupIncorrectrangedateComponent {

  constructor(
    public dialogRef: MatDialogRef<PopupIncorrectrangedateComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
