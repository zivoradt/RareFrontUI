import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeEntry } from '../model/employeEntry';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl =
    'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';

  constructor(private http: HttpClient) {}

  getEmployeeData(): Observable<EmployeeEntry[]> {
    return this.http.get<EmployeeEntry[]>(this.apiUrl);
  }

  processEmployeeData(
    data: EmployeeEntry[]
  ): { name: string; totalHours: number }[] {
    const employeeMap: { [name: string]: number } = {};

    data.forEach((entry) => {
      const name = entry.EmployeeName || 'No name'; // Set 'No name' if null or undefined
      const hours = this.calculateTotalHours(entry);
      if (employeeMap[name]) {
        employeeMap[name] += hours;
      } else {
        employeeMap[name] = hours;
      }
    });

    return Object.keys(employeeMap)
      .map((name) => ({
        name,
        totalHours: Math.round(employeeMap[name]), // Round to nearest whole number
      }))
      .sort((a, b) => b.totalHours - a.totalHours);
  }

  private calculateTotalHours(entry: EmployeeEntry): number {
    const start = new Date(entry.StarTimeUtc).getTime();
    const end = new Date(entry.EndTimeUtc).getTime();
    return (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours
  }
}
