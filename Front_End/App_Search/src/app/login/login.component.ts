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
      password: new FormControl(),
      username2: new FormControl(),
      password2: new FormControl()
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
      const { username, password, username2, password2 } = this.formulario.value;
      
      // Check if the regular login fields are filled
      if (username && password) {
        const regularResponse = await this.ApiService.loginer(username, password);
        
        if (regularResponse && regularResponse.data && regularResponse.data.tokenAuth && regularResponse.data.tokenAuth.token) {
          console.log("Regular authentication successful");
          localStorage.setItem('token', regularResponse.data.tokenAuth.token);
          this.router.navigate(['/home']);
          return; // Exit the function since regular login succeeded
        }
      }
      
      // If regular login failed or LDAP fields are filled, try LDAP authentication
      if (username2 && password2) {
        const ldapResponse = await this.ApiService.authenticateLDAP(username2, password2);
        
        if (ldapResponse && ldapResponse === '¡Inicio de sesión exitoso!') {
          console.log("LDAP authentication successful");
          return; // Exit the function since LDAP login succeeded
        }
      }
      
      // If neither regular nor LDAP login succeeded, show error message
      console.log("Login failed");
      this.openIncorrectPasswordDialog();
    } catch (error) {
      console.error("Error during login:", error);
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




