import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/result.model';
import { HealthService } from 'src/app/services/api/health.service';

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.scss'],
})
export class HealthCheckComponent implements OnInit {
  icmpResult: Result[] = [];
  isLoading: boolean = true;

  constructor(private healthService: HealthService) {}

  ngOnInit(): void {
    this.getHealth();
  }

  getHealth() {
    this.healthService.checkHealth().subscribe({
      next: (data) => {
        this.icmpResult = data.checks;
      },
      error: (error) => {
        console.log('error', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  refreshInfo() {
    this.isLoading = true;
    this.icmpResult = [];
    this.getHealth();
  }
}
