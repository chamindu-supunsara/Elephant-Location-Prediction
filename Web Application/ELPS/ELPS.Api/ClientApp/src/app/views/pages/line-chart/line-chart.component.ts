import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  isLoading: boolean = true;

  chartLineData = {
    labels: [  '605', '606', '607', '608', '609',  '610', '611', '612', '613', '614',  '615', '616', '617', '618', '619',  '620', '621', '622', '623', '624',  '625', '626', '627', '628', '629',  '630', '631', '632', '633', '634',  '635', '636', '637', '638', '639',  '640', '641', '642', '643', '644',  '645', '646', '647', '648', '649',  '650', '651', '652', '653', '654',  '655', '656', '657'],
    datasets: [
      {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        label: 'Count',
        borderColor: '#749F82',
        pointBackgroundColor: '#183D3D',
      }
    ],
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData() {
    this.authService.getBirthData().subscribe((locationData: string[]) => {
      const locationCounts: { [key: string]: number } = {};
    
      for (let i = 605; i <= 657; i++) {
        const locationCount = locationData.filter(location => location === i.toString()).length;
        locationCounts['location' + i] = locationCount;
      }
    
      const chartData = Object.values(locationCounts);
    
      this.chartLineData.datasets[0].data = chartData;
      this.isLoading = false;
    });    
  }
}
