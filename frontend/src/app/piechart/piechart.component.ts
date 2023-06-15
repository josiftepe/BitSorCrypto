import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartDataset } from 'chart.js';
import {ShowordersserviceService} from "../showordersservice.service";
import { fromEvent, map } from 'rxjs';
import {toArray} from "rxjs/operators";
interface MyData {
  [key: string]: any; // Adjust the type based on your object's structure
}
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit{
  generatePieChart(): void {
    const chartOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };

    const chartData: ChartDataset[] = [
      {
        data: [10, 20, 30, 20, 20], // Example data for the pie chart
        backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple'], // Example background colors for the pie slices
        label: 'Data'
      }
    ];

    const chartLabels: string[] = ['Bitcoin', 'Ethereum', 'Chainlink', 'Atom', 'XRP']; // Example labels for the pie slices

    // Create the pie chart
    const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: chartLabels,
        datasets: chartData
      },
      options: chartOptions
    });
  }
  constructor(private showService : ShowordersserviceService) {
  }
  dataArray : any = []
  ngOnInit(): void {
    this.showService.getAllAsets().pipe(toArray()).subscribe(x => {
      for(let i = 0; i < x.length; i++) {
        const a = x.at(i)
        console.log(a)
      }
    })

    this.generatePieChart();
  }

}
