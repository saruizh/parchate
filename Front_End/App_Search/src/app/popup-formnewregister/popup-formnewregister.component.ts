import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule,FormGroup,FormBuilder} from '@angular/forms';
import { DataformService } from '../dataform.service';
import { MatDialogRef,MatDialog } from '@angular/material/dialog';
import { PopupCorrectregisterComponent } from '../popup-correctregister/popup-correctregister.component';
import { PopupIncorrectregisterComponent } from '../popup-incorrectregister/popup-incorrectregister.component';


@Component({
  selector: 'app-popup-formnewregister',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './popup-formnewregister.component.html',
  styleUrl: './popup-formnewregister.component.css'
})
export class PopupFormnewregisterComponent {
  cerrarDialogo(){
    this.dialogRef.close();
  }

  formulario: FormGroup;
  constructor(private DataService: DataformService,private fb: FormBuilder,public dialogRef: MatDialogRef<PopupFormnewregisterComponent>, private dialog: MatDialog){
    this.formulario = this.fb.group({
      NIC_Cedula:[''],
      Nombre: [''],
      Celular: [''],
      Direccion:[''],
      Tipo_cargue:['Individual'],
      Celular_nuevo:['0'],
      Direccion_nuevo:['0']
    });
  }

  onSubmit(){
    const formData = this.formulario.value;
    console.log(formData);
    this.DataService.CreateRegister(formData).subscribe(
      response => {
        this.dialogRef.close();
        this.dialog.open(PopupCorrectregisterComponent, {
        });
        
      },
      error => {
        this.dialog.open(PopupIncorrectregisterComponent, {
        });
      });
  }
}

