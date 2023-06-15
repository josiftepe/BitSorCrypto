import {Component} from '@angular/core';
import {OrderService} from "../order.service";
import {Order} from "../Order";
import {OrderType} from "../OrderType";
import {OrderDirection} from "../OrderDirection";
import {PriceService} from "../price.service";
import {AuthenticationService} from "../authentication.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent {

  coinSelected : String = ""
  isDropdownActive = false;
  oftenSelected : String = "";
  iconCoin : String = "";
  quantityTextBox : String = ""
  btnGreen : boolean = true
  btnRed : boolean = false
  cryptoTextBox : String = ""
  btnGreenClicked : boolean = false
  btnRedClicked : boolean = false
  selectedOrder : String = "market"
  priceOfOrder : String = ""
  realPrice : number = 0
  LIMIT : boolean = false
  MARKET : boolean = true
  poolId : Number = 1
  orderType : OrderType = OrderType.MARKET
  orderDirectiom : OrderDirection = OrderDirection.BUY
  show(name : String) {
    this.coinSelected = name
    console.log("clicked", name)
    if(name == 'Bitcoin') {
      this.cryptoTextBox = 'BTC'
      this.poolId = 1
    }
    else if(name == 'Ethereum') {
      this.cryptoTextBox = 'ETH'
      this.poolId = 2
    }
    else if(name == 'Chainlink') {
      this.cryptoTextBox = 'LINK'
      this.poolId = 3
    }
    else if(name == 'XRP') {
      this.cryptoTextBox = 'XRP'
      this.poolId = 4
    }
    else if(name == 'Atom') {
      this.cryptoTextBox = 'ATOM'
      this.poolId = 5
    }
    else {
      this.cryptoTextBox = ''
    }

  }
  oftenShow(name : String) {
    this.oftenSelected = name;
  }
  toggleDropdown() {
    this.isDropdownActive = !this.isDropdownActive;
  }
  changeQuantityBox(price : String) {
    this.quantityTextBox = price;
  }
  buttonClicked(btn : String) {
    console.log("loged in" + this.authenticationService.isUserLoggedIn())
    if(btn === 'buy') {
      this.btnGreen = true;
      this.btnRed = false;
      this.btnGreenClicked = true
      this.btnRedClicked = false
      this.orderDirectiom = OrderDirection.BUY
    }

    else {
      this.btnGreen = false
      this.btnRed = true
      this.btnGreenClicked = false
      this.btnRedClicked = true
      this.orderDirectiom = OrderDirection.SELL
    }
    console.log(this.btnGreen, this.btnRed)
  }

  setOrderType(type : String) {
    if(type == "market") {
      this.selectedOrder = 'market'
      this.orderType = OrderType.MARKET
      this.priceOfOrder = "MARKET PRICE"


    }
    else {
      this.selectedOrder = 'limit'
      this.orderType = OrderType.LIMIT


    }
  }
  async getPrice() {
    if (this.orderType === OrderType.MARKET) {
      try {
        const x = await this.priceService.getPrice(this.poolId).toPromise();
        this.realPrice = Number(x);
        console.log(x);
      } catch (error) {
        console.error(error);
      }
    } else {
      this.realPrice = Number(this.priceOfOrder.toString());
    }
let quan = 0
    if(this.orderDirectiom == OrderDirection.BUY) {
      quan = Number(this.quantityTextBox.toString()) / this.realPrice
    }
    else {
      quan = Number(this.quantityTextBox.toString())
    }

    let order: Order = {
      poolID: this.poolId,
      orderType: this.orderType,
      direction: this.orderDirectiom,
      price: this.realPrice,
      quantity: quan,
    };

    this.orderService.createOrder(order).subscribe(
      (success) => {
        console.log("order successfully sent");
        this.toastr.success("Order successfull!")
      },
      (error) => {
        console.error(error);
        this.toastr.success("Order successfull!")
      }
    );
    // window.location.href = '/trade'
  }

  constructor(private orderService : OrderService, private priceService : PriceService, private authenticationService : AuthenticationService, private toastr : ToastrService) {
  }
}

