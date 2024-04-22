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

  formulario2: FormGroup;
  formulario: FormGroup;
  ApiService =inject(ApiService);

  constructor(private router: Router,private dialog: MatDialog){
    this.formulario= new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
    
    this.formulario2= new FormGroup({
      email: new FormControl(),
      username: new FormControl(),
      password: new FormControl()
    })  
  }

  async onSubmit(){
    try {
      const { email, username, password } = this.formulario2.value;
      const response = await this.ApiService.register(email, username, password);
      console.log(response); 
    } catch(error) {
      console.error('Error al enviar el formulario:', error);
    }
  }
  
  async login() {
    try {
        const { username, password } = this.formulario.value;
        const response = await this.ApiService.loginer(username, password);
        if (response && response.data && response.data.tokenAuth && response.data.tokenAuth.token) {
            localStorage.setItem('token', response.data.tokenAuth.token);
            this.router.navigate(['/home']);
        } else {
          this.openIncorrectPasswordDialog();
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




