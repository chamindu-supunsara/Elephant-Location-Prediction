import { Component, OnInit } from '@angular/core';
import { CsvService } from 'src/app/csv.service';
import { AuthService } from 'src/app/views/services/auth.service';

@Component({
  selector: 'app-view-erecord',
  templateUrl: './view-erecord.component.html',
  styleUrls: ['./view-erecord.component.css']
})
export class ViewErecordComponent implements OnInit{
  records: any[] = [];

  constructor(private authService: AuthService, private csvService: CsvService) { }

  ngOnInit() {
    this.authService.getRecord().subscribe(
      (data: any) => {
        this.records = data;
      },
      error => {
        console.error('Error fetching user data', error);
      }
    );
  }

  exportToCSV(): void {
    const filename = 'elephants_records.csv';
    const header = ['name', 'date', 'weatherCondition', 'time', 'hours', 'location'];
    
    this.csvService.downloadFile(this.records, filename, header);
  }
}
