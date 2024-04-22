import { Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ChecktokenService } from '../checktoken.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [MatButtonModule,MatCardModule,HeaderComponent,FooterComponent],
})
export class HomeComponent{
  
  constructor(private ChecktokenService: ChecktokenService, private router: Router ){};


  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (token) {
      this.ChecktokenService.verifyToken(token).subscribe(
        (response) => {
          //No realiza ninguna acción
        },
        (error) => {
          //this.router.navigate(['/login']);
        }
      );
    } else {
      //this.router.navigate(['/login']);
    }    
  }
  
}
