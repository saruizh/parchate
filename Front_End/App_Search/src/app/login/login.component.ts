import { Component,inject} from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup,FormControl,ReactiveFormsModule} from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { PopupIncorrectpasswordComponent } from '../popup-incorrectpassword/popup-incorrectpassword.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,HttpClientModule,ReactiveFormsModule,PopupIncorrectpasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent{

  formulario: FormGroup;
  ApiService =inject(ApiService);

  constructor(private router: Router,private dialog: MatDialog){
    this.formulario= new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }
  async onSubmit(){
    try {
      const formValue = this.formulario.value;
      const response = await this.ApiService.loginer(formValue);
      if (response && response.access) {
        localStorage.setItem('token', response.access);
        this.router.navigate(['/home']);
        
      } else {
        //console.error('Respuesta sin propiedad "access" esperada.');
      }
    } catch (error) {
      this.openIncorrectPasswordDialog();
    }
  }

  openIncorrectPasswordDialog() {
    const dialogref=this.dialog.open(PopupIncorrectpasswordComponent,{
    });
    dialogref.afterClosed().subscribe(result => {
            
    });
  }
  
}




