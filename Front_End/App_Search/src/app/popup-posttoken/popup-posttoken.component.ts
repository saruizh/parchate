import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef,MatDialog } from '@angular/material/dialog';
import { PopupValidtokenComponent } from '../popup-validtoken/popup-validtoken.component';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { PopupInvalidtokenComponent } from '../popup-invalidtoken/popup-invalidtoken.component';
import { EnroutesService } from '../enroutes.service';

@Component({
  selector: 'app-popup-posttoken',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './popup-posttoken.component.html',
  styleUrl: './popup-posttoken.component.css'
})
export class PopupPosttokenComponent {
  formulario: FormGroup;
  domain=''

  cerrarDialogo(){
    this.dialogRef.close();
  }


  constructor(private EnroutesService: EnroutesService,@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,
        public dialogRef: MatDialogRef<PopupPosttokenComponent>,private dialog: MatDialog,
        private http: HttpClient) {
    this.formulario = this.fb.group({
      Direccion_nuevo: [''], 
      Token_sms: ['', Validators.required] 
    });
  }
  onSubmit() {
    if (this.formulario.valid) {
      const ingresoToken = String(this.formulario.value.Token_sms);
      const Direccion = String(this.formulario.value.Direccion_nuevo);
      const Celular=String(this.data.Celular);
      const NIC=String(this.data.NIC_Cedula);
      const Id=this.data.Id;
      const tokenCorrecto = String(this.data.Token);


      if (ingresoToken === tokenCorrecto) {       
        //Cierro popup actual
        this.dialogRef.close();
        //Creo popup de token valido
        const dialogref2 = this.dialog.open(PopupValidtokenComponent, {
          
        });

        //Actualizo el error del sms
        this.actualizarerrorSMS(Id);      
        //Actualizo el registro de la base
        const Cadena=NIC+'_'+Celular+'_'+Direccion
        this.actualizarregistrobase(Cadena);       

      } else {
        this.dialog.open(PopupInvalidtokenComponent,{
          
        });
        //Cierro popup y se hará validación por la otra ventana en el momento que llegue el sms
      }
    }
  }

  actualizarerrorSMS(Id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    this.domain=this.EnroutesService.domain;
    const url =this.domain+ `api/Actualizar_error_envio_sms/${Id}/`;
    
    this.http.put(url, {}, { headers: headers }).subscribe(
      (response: any) => {
        
      },
      (error) => {
        
      }
    );
  }

  actualizarregistrobase(Cadena: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    this.domain=this.EnroutesService.domain;
    const url = this.domain+`api/Actualizar_Registro_Base/${Cadena}/`;
    
    this.http.put(url, {}, { headers: headers }).subscribe(
      (response: any) => {
        
      },
      (error) => {
        
      }
    );
  }
        

}
