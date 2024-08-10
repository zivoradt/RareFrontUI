import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { EmployeeService } from '../../services/employee.service';

import { EmployeeEntry } from '../../model/employeEntry';
import { HttpClientModule } from '@angular/common/http';

interface Employee {
  name: string;
  totalHours: number;
}

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, HttpClientModule],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
})
export class EmployeeTableComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['name', 'totalHours'];
  loading = true;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployeeData().subscribe({
      next: (data: EmployeeEntry[]) => {
        this.employees = this.employeeService.processEmployeeData(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching employee data:', err);
        this.loading = false;
      },
    });
  }

  isUnder100Hours(employee: Employee): boolean {
    return employee.totalHours < 100;
  }
}
