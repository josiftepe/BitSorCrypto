import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShowordersserviceService {
    url : String =  "http://localhost:8080/api/wallet"
  constructor(private  http : HttpClient) { }

  getAllOrders() {
      const path = this.url + '/orders'
    return this.http.get<any>(path)
  }
  getTotalBalance() {
      const path = this.url + '/total'
    return this.http.get(path)
  }
  getUSDBalance() {
      const path = this.url + '/balance'
    return this.http.get(path)
  }
  getAllAsets() {
      const path = this.url + '/assets'
    return this.http.get<any>(path)
  }
}
