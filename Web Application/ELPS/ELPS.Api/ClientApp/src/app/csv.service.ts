import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CsvService {
  constructor() {}

  downloadFile(data: any[], filename: string, header: string[]): void {
    const csvData = this.convertToCSV(data, header);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

    if ((navigator as any).msSaveOrOpenBlob) {
      // Edge and IE 10+
      (navigator as any).msSaveOrOpenBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  private convertToCSV(data: any[], header: string[]): string {
    const csv: string[] = [];
    csv.push(header.join(','));
  
    data.forEach((row) => {
      const values: string[] = [];
      header.forEach((field) => {
        values.push(String(row[field])); // Ensure that values are strings
      });
      csv.push(values.join(','));
    });
  
    return csv.join('\n');
  }
  
}
