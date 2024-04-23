import { Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormGroup,FormControl,ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ChecktokenService } from '../checktoken.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [ReactiveFormsModule,MatButtonModule,MatCardModule,HeaderComponent,FooterComponent],
})
export class HomeComponent{
  formulario1: FormGroup;
  
  constructor(private ApiService: ApiService,private ChecktokenService: ChecktokenService, private router: Router ){
    this.formulario1= new FormGroup({
      idplan: new FormControl(),
      nombreVaca: new FormControl(),
      fechaLimite: new FormControl(),
      montoTotal: new FormControl(),
      alcance: new FormControl()
    });
  };

  ngOnInit(): void {
 
  }
  async onSubmit(){
    try {
      const { idplan, nombreVaca, fechaLimite,montoTotal,alcance} = this.formulario1.value;
      const response = await this.ApiService.createcow(idplan, nombreVaca, fechaLimite,montoTotal,alcance);
      console.log(response);

    } catch(error) {
      console.error('Error al enviar el formulario:', error);
    }
  }



  
}
