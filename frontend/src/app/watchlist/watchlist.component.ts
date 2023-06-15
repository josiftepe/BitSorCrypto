import {Component, OnInit} from '@angular/core';
import {PriceService} from "../price.service";

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit{
  btcPrice : String = "0000"
  ethPrice : String = "0000"
  linkPrice : String = "0000"
  xrpPrice : String = "0000"
  atomPrice : string = "0000"


  constructor(private priceService : PriceService) {
  }
  ngOnInit() {
    this.priceService.getPrice(1).subscribe(x => {
      this.btcPrice = x.toString()
    })
    this.priceService.getPrice(2).subscribe(x => {
      this.ethPrice = x.toString()
    })
    this.priceService.getPrice(3).subscribe(x => {
      this.linkPrice = x.toString()
    })
    this.priceService.getPrice(4).subscribe(x => {
      this.xrpPrice = x.toString()
    })
    this.priceService.getPrice(5).subscribe(x => {
      this.atomPrice = x.toString()
    })
  }

}
