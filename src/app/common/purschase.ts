import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./order-item";

export class Purschase {
    customer!: Customer;
    address!: Address;
    order!: Order;
    orderItems!: OrderItem[]; 
}
