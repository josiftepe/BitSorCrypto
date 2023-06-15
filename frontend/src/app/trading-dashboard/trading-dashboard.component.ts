import {Component, OnInit} from '@angular/core';
import {ShowordersserviceService} from "../showordersservice.service";
import {PendingOrder} from "../pendingOrder";

@Component({
  selector: 'app-trading-dashboard',
  templateUrl: './trading-dashboard.component.html',
  styleUrls: ['./trading-dashboard.component.css']
})
export class TradingDashboardComponent implements OnInit{
  orders : PendingOrder[] = []
  constructor(private orderService : ShowordersserviceService) {
  }
  ngOnInit() {
    this.orderService.getAllOrders().pipe().subscribe(x => {
      for(let i = 0; i < x.length; i++) {
        if(x.at(i)["status"].toString() == "PENDING") {
          this.orders.push({name: x.at(i)["asset"]["name"],
          price : x.at(i)["price"]})

          console.log(x.at(i)["asset"]["name"])
          console.log(x.at(i))
        }

      }
    })
  }
}
