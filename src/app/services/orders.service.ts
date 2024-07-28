import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as ordersData from '.././../../public/mock_data/orders.json';
import { Order } from '../enums/Order';

@Injectable()
export class OrdersService {

  private data = ordersData;

   getOrders(): Observable<Order[]> {
    return of(this.data.orders);
  }
}
