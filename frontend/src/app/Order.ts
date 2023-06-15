import {OrderType} from "./OrderType";
import {OrderDirection} from "./OrderDirection";

export interface Order {
  poolID : Number
  orderType : OrderType,
  direction : OrderDirection,
  price: Number
  quantity: Number
}
