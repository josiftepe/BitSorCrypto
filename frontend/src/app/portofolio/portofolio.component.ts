import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
// @ts-ignore
import { Label, SingleDataSet } from 'ng2-charts';
import {ShowordersserviceService} from "../showordersservice.service";
@Component({
  selector: 'app-portofolio',
  templateUrl: './portofolio.component.html',
  styleUrls: ['./portofolio.component.css']
})
export class PortofolioComponent implements OnInit{

  totalBalance : String = ""
  usdBalance : String = ""
  btcQuan : String = "0.0"
  ethQuan : String = "0.0"
  linkQuan : String = "0.0"
  xrpQuan : String = "0.0"
  atomQuan : String = "0.0"

  data : []
    constructor(private showordersService : ShowordersserviceService) {
    }
  ngOnInit() {
    this.showAsset()
    this.showordersService.getUSDBalance().subscribe(x => {
      this.usdBalance = x.toString()
      console.log(x)

    }

    )
    this.showordersService.getTotalBalance().subscribe(x => {
      this.totalBalance = x.toString()
      console.log(x)
    })

  }
  showUSD() {
    this.showordersService.getUSDBalance().subscribe(x => {
      this.usdBalance = x.toString()
      console.log(x)

    })
  }
  showTotal() {
    this.showordersService.getTotalBalance().subscribe(x => {
      this.totalBalance = x.toString()
      console.log(x)
    })
  }
  showAsset() {
    this.showordersService.getAllAsets().pipe().subscribe(x => {
      for(let i = 0; i < x.length; i++) {
        if(i == 0) {
          this.btcQuan = x.at(i)[1];
        }
        else if(i == 1) {
          this.ethQuan = x.at(i)[1];
        }
        else if(i == 2) {
          this.linkQuan = x.at(i)[1];
        }
        else if(i == 3) {
          this.xrpQuan = x.at(i)[1];
        }
        else {
          this.atomQuan = x.at(i)[1];
        }
      }
    })
  }
}
