import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-incorrect-nic',
  standalone: true,
  imports: [],
  templateUrl: './popup-incorrect-nic.component.html',
  styleUrl: './popup-incorrect-nic.component.css'
})
export class PopupIncorrectNICComponent {

  constructor(
    public dialogRef4: MatDialogRef<PopupIncorrectNICComponent>) {}

  onNoClick(): void {
    this.dialogRef4.close();
  }

}
