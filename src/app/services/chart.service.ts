import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor() {}

  createPieChart(
    canvasId: string,
    labels: string[],
    data: number[],
    colors: string[]
  ): Chart | null {
    if (labels.length === 0 || data.length === 0) {
      console.error('No data to display in chart.');
      return null;
    }

    const totalHours = data.reduce((sum, current) => sum + current, 0);
    const percentages = data.map((value) =>
      parseFloat(((value / totalHours) * 100).toFixed(1))
    );

    return new Chart(canvasId, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: 'Percentage of Total Hours Worked',
            data: percentages,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const value = tooltipItem.raw as number;
                const percentage = value.toFixed(1) + '%';
                return `${tooltipItem.label}: ${percentage}`;
              },
            },
          },
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Employee Percentage of Total Hours Worked',
          },
        },
      },
      plugins: [
        ChartDataLabels,
        {
          id: 'percentagePlugin',
          beforeDraw: (chart) => {
            chart.data.datasets.forEach((dataset) => {
              dataset.data = percentages;
            });
          },
        },
      ],
    });
  }

  generateColors(count: number): string[] {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${(i * 360) / count}, 70%, 50%)`);
    }
    return colors;
  }
}
