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
import { ExcelService } from '../excel.service';
import { Router } from '@angular/router';
import { ChecktokenService } from '../checktoken.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupDownloadbaseComponent } from '../popup-downloadbase/popup-downloadbase.component';
import { PopupDownloadbaseafterComponent } from '../popup-downloadbaseafter/popup-downloadbaseafter.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { EnroutesService } from '../enroutes.service';


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
  
  constructor(private EnroutesService: EnroutesService,private http: HttpClient,private excelService: ExcelService,private cdr: ChangeDetectorRef,private router: Router, private ChecktokenService: ChecktokenService,private dialog: MatDialog){}

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    if (token) {
      this.ChecktokenService.verifyToken(token).subscribe(
        (response) => {
          this.obtenerUltimosDatos();
        },
        (error) => {
          //this.router.navigate(['/login']);
        }
      );
    } else {
      //this.router.navigate(['/login']);
    }    
  }

  obtenerDatos(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    this.domain=this.EnroutesService.domain;
    return this.http.get(this.domain+'api/Obtener_Base/', { headers: headers });
  }

  
  obtenerUltimosDatos() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.domain=this.EnroutesService.domain;
    this.http.get(this.domain+'api/Obtener_Base_last/', { headers: headers }).subscribe(
      (data: any) => {
        this.datos2 = data;
        this.dataSource = new MatTableDataSource<any>(this.datos2);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        
      }
    );
  }

  downloadExcel(): void {
    const dialogref=this.dialog.open(PopupDownloadbaseComponent,{disableClose: true,
    });
    
    this.obtenerDatos().subscribe(
      (data: any) => {
        this.datos = data;
        this.excelService.fetchDataAndConvertToCSV(data,'Base de titularidades');
        //this.excelService.exportToExcel(this.datos, 'Base titularidades');
        dialogref.close();
        dialogref.afterClosed().subscribe(result => {
          const dialogref2=this.dialog.open(PopupDownloadbaseafterComponent, {
          });
          dialogref2.afterClosed().subscribe(result =>{
          });
        });
        
      },
      (error) => {
        console.error('Error al obtener datos', error);
      }
    );
    
  }
  
  InputNIC: string = '';

  FiltroNIC(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.domain=this.EnroutesService.domain; 
    return this.http.get(this.domain+'api/Obtener_NIC/'+this.InputNIC+'/', { headers: headers });
  }

  FiltrarNIC() {
    this.FiltroNIC().subscribe(
      (data: any) => {
        this.datos3 = data;
      },
      (error) => {
        
      }
    );
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.excelService.uploadExcelFile(file);
  }


}
