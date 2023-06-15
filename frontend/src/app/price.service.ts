import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PriceService {
   url = "http://localhost:8080/api/pools"
  constructor(private http : HttpClient) { }

  getPriceById(id : Number) {
     const val = this.url + "/" + `${id}`
    console.log(val)
     return this.http.get(val)
  }

  getPrice(id: Number){
    const val = this.url + "/" + `${id}/price`
    console.log(val)
    return this.http.get(val)
  }
}
