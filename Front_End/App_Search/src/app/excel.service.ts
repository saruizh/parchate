import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { EnroutesService } from './enroutes.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor(private EnroutesService: EnroutesService,private http: HttpClient) { }
  
  exportToExcel(data: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  
  uploadExcelFile(file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const data: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
      const sheetName: string = workbook.SheetNames[0];
      const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 1 });

      // Convert jsonData to the desired format
      const formattedData = this.formatData(jsonData);
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      this.http.post(this.EnroutesService.domain+'api/Cargar_Base/', formattedData,{ headers: headers }).subscribe(response => {
      });
    };

    reader.readAsBinaryString(file);
  }


  private formatData(jsonData: any[]): any[] {
    // Implement logic to format jsonData according to the desired format
    return jsonData.map(row => {
      return {
        NIC_Cedula: row[0],
        Nombre: row[1],
        Celular: row[2],
        Direccion: row[3],
        Tipo_cargue:row[4],
        Celular_nuevo: row[5],
        Direccion_nuevo: row[6]
      };
    });
  }

  async fetchDataAndConvertToCSV(jsonData: any,fileName: string) {
    try {
      
      const csvData = this.convertJSONToCSV(jsonData);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      saveAs(blob,fileName+'.csv');
    } catch (error) {
      
    }
  }

  private convertJSONToCSV(jsonData: any[]): string {
    const headers = Object.keys(jsonData[0]).join(',') + '\n';
    const rows = jsonData.map(obj => Object.values(obj).join(',')).join('\n');
    return headers + rows;
  } 


}
