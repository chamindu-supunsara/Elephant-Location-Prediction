import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/views/services/auth.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private authService: AuthService) {
  }

  chartDoughnutData = {
    labels: ['Northeast Monsoon', 'First Inter Monsoon', 'Southwest Monsoon', 'Second Inter Monsoon'],
    datasets: [
      {
        backgroundColor: ['#00D8FF', '#41B883', '#E46651', '#FFFF00'],
        data: [0, 0, 0, 0]
      }
    ]
  };

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
