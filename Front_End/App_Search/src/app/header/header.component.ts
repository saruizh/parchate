import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterLinkActive,Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor(private router: Router){
  }

  Salir(){
    localStorage.removeItem('token');
  }

}

