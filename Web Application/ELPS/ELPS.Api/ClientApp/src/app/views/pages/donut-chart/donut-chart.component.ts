import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {
  isLoading: boolean = true;

  chartDoughnutData = {
    labels: ['Northeast', 'First Inter', 'Southwest', 'Second Inter'],
    datasets: [
      {
        backgroundColor: ['#425F57', '#749F82', '#A8E890', '#CFFF8D'],
        data: [0, 0, 0, 0]
      }
    ],
  };

  chartDoughnutOption: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData() {
    this.authService.getStatusData().subscribe((weatherConditionData: string[]) => {
      const northeastCount = weatherConditionData.filter(weatherCondition => weatherCondition === 'Northeast Monsoon').length;
      const firstInterCount = weatherConditionData.filter(weatherCondition => weatherCondition === 'First Inter Monsoon').length;
      const southwest = weatherConditionData.filter(weatherCondition => weatherCondition === 'Southwest Monsoon').length;
      const secondInterCount = weatherConditionData.filter(weatherCondition => weatherCondition === 'Second Inter Monsoon').length;

      this.chartDoughnutData.datasets[0].data = [northeastCount, firstInterCount, southwest, secondInterCount];
      this.isLoading = false;
    });
  }
}
