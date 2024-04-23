import {Component,ViewChild,ChangeDetectorRef} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChecktokenService } from '../checktoken.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupDownloadbaseComponent } from '../popup-downloadbase/popup-downloadbase.component';
import { PopupDownloadbaseafterComponent } from '../popup-downloadbaseafter/popup-downloadbaseafter.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { EnroutesService } from '../enroutes.service';
import { ApiService } from '../api.service';



@Component({
  selector: 'app-bases',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule,FormsModule,PopupDownloadbaseComponent, PopupDownloadbaseafterComponent],
  templateUrl: './bases.component.html',
  animations:[
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms', style({ opacity: 5 }))
      ]),
      transition(':leave', [
        animate('800ms', style({ opacity: 0 }))
      ])
    ])
  ],
  styleUrl: './bases.component.css'
})
export class BasesComponent {
  
  constructor(private apiService: ApiService,  private EnroutesService: EnroutesService,private http: HttpClient,private cdr: ChangeDetectorRef,private router: Router, private ChecktokenService: ChecktokenService,private dialog: MatDialog){}
  ngOnInit(): void {
  }




}
