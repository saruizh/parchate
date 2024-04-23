import {Component,ViewChild,ChangeDetectorRef} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChecktokenService } from '../checktoken.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupDownloadbaseComponent } from '../popup-downloadbase/popup-downloadbase.component';
import { PopupDownloadbaseafterComponent } from '../popup-downloadbaseafter/popup-downloadbaseafter.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { EnroutesService } from '../enroutes.service';
import { ApiService } from '../api.service';


interface Datos3 {
  NIC_Cedula: string;
  Nombre: string;
  Celular: string;
  Direccion: string;
  Celular_nuevo: string;
  Direccion_nuevo: string;
}

@Component({
  selector: 'app-bases',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,MatPaginatorModule,MatTableModule,ReactiveFormsModule,PaginationModule,FormsModule,PopupDownloadbaseComponent, PopupDownloadbaseafterComponent],
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
  lugares: any[] = [];
  datos: any[] = [];
  datos2: any[] =[];
  domain: string='';

  datos3: Datos3 = {
    NIC_Cedula: '',
    Nombre: '',
    Celular: '',
    Direccion: '',
    Celular_nuevo: '',
    Direccion_nuevo: '',
  };
  
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  itemsPorPagina = 10;
  paginaActual = 1;
  filtroNIC: string = '';
  datosFiltrados: any[] = [];
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  constructor(private apiService: ApiService,  private EnroutesService: EnroutesService,private http: HttpClient,private cdr: ChangeDetectorRef,private router: Router, private ChecktokenService: ChecktokenService,private dialog: MatDialog){}

  ngOnInit(): void {
  }

  
  obtenerLugares() {
    this.apiService.getLugares().subscribe(
      (data) => {
        console.log(data);
        this.lugares = data.getLugares;
      },
      (error) => {
        console.error('Error al obtener lugares:', error);
      }
    );
  }


  
 


}
