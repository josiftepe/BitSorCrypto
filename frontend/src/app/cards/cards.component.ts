import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Chart} from 'chart.js';
import axios from 'axios';
import { createChart } from 'lightweight-charts';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent  implements OnInit, AfterViewInit{

  ngOnInit() {}

  ngAfterViewInit() {}


}
