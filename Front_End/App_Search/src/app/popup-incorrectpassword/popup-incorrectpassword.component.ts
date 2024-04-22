import { Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-popup-incorrectpassword',
  standalone: true,
  imports: [],
  templateUrl: './popup-incorrectpassword.component.html',
  styleUrl: './popup-incorrectpassword.component.css'
})
export class PopupIncorrectpasswordComponent {

  constructor(
    public dialogRef: MatDialogRef<PopupIncorrectpasswordComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
