import { Component,ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Observable } from 'rxjs';
import {JsonPipe} from '@angular/common';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { ExcelService } from '../excel.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NativeDateAdapter} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule,FormGroup,FormBuilder} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataformService } from '../dataform.service';
import { ChecktokenService } from '../checktoken.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupDownloadbaseComponent } from '../popup-downloadbase/popup-downloadbase.component';
import { PopupDownloadbaseafterComponent } from '../popup-downloadbaseafter/popup-downloadbaseafter.component';
import { PopupIncorrectrangedateComponent } from '../popup-incorrectrangedate/popup-incorrectrangedate.component';
import { PopupIncorrectNICComponent } from '../popup-incorrect-nic/popup-incorrect-nic.component';
import { PopupPosttokenComponent } from '../popup-posttoken/popup-posttoken.component';
import { LasttokenNICService } from '../lasttoken-nic.service';
import { PopupFormnewregisterComponent } from '../popup-formnewregister/popup-formnewregister.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { EnroutesService } from '../enroutes.service';



@Component({
  selector: 'app-sms',
  standalone: true,
  providers: [NativeDateAdapter],  
  imports: [FooterComponent,JsonPipe,HeaderComponent,MatPaginatorModule,PaginationModule,FormsModule,ReactiveFormsModule,MatDatepickerModule,MatFormFieldModule],
  animations:[
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 10 }))
      ]),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './sms.component.html',
  styleUrl: './sms.component.css'
})


export class SmsComponent {
  datos: any[] =[];
  datos2: any[] =[];
  datosBase: any[]=[];
  mostrar: boolean = false;
  domain=''

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
  Fecha_Inicio: string = '';
  Fecha_Fin: string = '';
  formulario: FormGroup;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  constructor(private EnroutesService: EnroutesService,private http: HttpClient,private excelService: ExcelService,private DataService: DataformService,private fb: FormBuilder,private ChecktokenService:ChecktokenService,private router: Router, private dialog: MatDialog,private LasttokenNIC: LasttokenNICService){
    this.formulario = this.fb.group({
      NIC_Cedula: [''],
      Celular: [''],
      Habeas: [false]
    });
    
  }
    
  
  obtenerDatos(fechaInicio: string, fechaFin: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.domain=this.EnroutesService.domain
    return this.http.get(this.domain+'api/sms_enviados/'+fechaInicio+'_'+fechaFin+'/', { headers: headers});
  }
  obtenerUltimosDatos() {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.domain=this.EnroutesService.domain
    this.http.get(this.domain+'api/sms_enviados_last/', { headers: headers }).subscribe(
      (data: any) => {
        this.datos2 = data;
        this.dataSource = new MatTableDataSource<any>(this.datos2);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        
      }
    );
  }

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

  downloadExcel(): void {
    const dialogref=this.dialog.open(PopupDownloadbaseComponent,{disableClose: true,
    });

    this.obtenerDatos(this.Fecha_Inicio,this.Fecha_Fin).subscribe(
      (data: any) => {
        this.datos = data;
        this.excelService.fetchDataAndConvertToCSV(data,'Base de sms '+this.Fecha_Inicio+'_'+this.Fecha_Fin);
        //this.excelService.exportToExcel(this.datos, 'Base de sms '+this.Fecha_Inicio+'_'+this.Fecha_Fin);
        dialogref.close();
        dialogref.afterClosed().subscribe(result => {
          const dialogref2=this.dialog.open(PopupDownloadbaseafterComponent, {
          });
          dialogref2.afterClosed().subscribe(result =>{
          });
        });


      },
      (error) => {

        dialogref.close();
        dialogref.afterClosed().subscribe(result => {
          const dialogref3=this.dialog.open(PopupIncorrectrangedateComponent, {
          });
          dialogref3.afterClosed().subscribe(result =>{
          });
        });        
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.excelService.uploadExcelFile(file);
  }

  
  onSubmit() {
    const formData = this.formulario.value;
  
    const Url = this.LasttokenNIC.setNIC(formData.NIC_Cedula);
    this.LasttokenNIC.getData(Url).subscribe(
      data_last_token => {
        this.DataService.postData(formData).subscribe(
          response => {
            
            const Url2 = this.LasttokenNIC.setNICSMS(formData.NIC_Cedula);
            this.LasttokenNIC.gettokenData(Url2).subscribe(
              lasttokensms => {                 
                const datax = {
                  Id: lasttokensms.Id,
                  NIC_Cedula: lasttokensms.NIC_Cedula,
                  Celular: lasttokensms.Celular,
                  Token: lasttokensms.Token_sms
                };
  
                const dialogref5 = this.dialog.open(PopupPosttokenComponent, {
                  disableClose: true,
                  data: datax
                });
  
                dialogref5.afterClosed().subscribe(result => {
                  // Código a ejecutar después de cerrar el diálogo
                });
  
              },
              error => {
                console.error(error);
              }
            );
          },
          error => {
            const dialogref4 = this.dialog.open(PopupIncorrectNICComponent, {});
            dialogref4.afterClosed().subscribe(result => {
              // Código a ejecutar después de cerrar el diálogo
            });
            console.error(error);
          }
        );
      },
      error => {
        const dialogref4 = this.dialog.open(PopupIncorrectNICComponent, {});
        dialogref4.afterClosed().subscribe(result => {
          // Código a ejecutar después de cerrar el diálogo
        });
      }
    );
  }
  obtenerUltimosDatosBase() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.domain=this.EnroutesService.domain

    this.http.get(this.domain+'api/Obtener_Base_last/', { headers: headers }).subscribe(
      (data: any) => {
        this.datosBase = data;
        this.dataSource = new MatTableDataSource<any>(this.datosBase);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  InputNIC: string = '';

  FiltroNIC(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.domain=this.EnroutesService.domain
    return this.http.get(this.domain+'api/Obtener_NIC/'+this.InputNIC+'/', { headers: headers });
  }
  FiltrarNIC() {
    this.FiltroNIC().subscribe(
      (data: any) => {
        this.datos3 = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  Nuevoregistro(){
    this.dialog.open(PopupFormnewregisterComponent, {
      disableClose: true
    });
  }

}

export interface DatosFormulario {
  NIC_Cedula: string;
  Celular: string;
  Direccion: string;
  AceptoTratamientoDatos: boolean;
}

interface Datos3 {
  NIC_Cedula: string;
  Nombre: string;
  Celular: string;
  Direccion: string;
  Celular_nuevo: string;
  Direccion_nuevo: string;
}


