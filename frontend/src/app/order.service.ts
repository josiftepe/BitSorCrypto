import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Order} from "./Order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/order/create';

  constructor(private http: HttpClient) {}

  createOrder(order: Order) {
    return this.http.post(this.apiUrl, order);
  }
}
