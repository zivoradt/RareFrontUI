import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';
import { provideCharts } from 'ng2-charts';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideCharts()],

  imports: [
    RouterOutlet,
    EmployeeTableComponent,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'RareClientUI';
}
