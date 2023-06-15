import {Component, OnInit} from '@angular/core';
import {ShowordersserviceService} from "../showordersservice.service";
import {map, toArray} from "rxjs/operators";

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent implements  OnInit{
  orders : any = []
  constructor(private showOrdersService : ShowordersserviceService) {

  }
  ngOnInit() {
    this.getOrders()
    console.log(this.orders)
  }

  getOrders() {
    this.showOrdersService.getAllOrders().pipe(
      toArray()
    ).subscribe(array => {
      this.orders = array
      console.log(array)
    });
    for(let i = 0; i < this.orders.length; i++) {
      console.log(this.orders.at(i).id, this.orders.at(i).asset.name.toString())
    }


  }
}
