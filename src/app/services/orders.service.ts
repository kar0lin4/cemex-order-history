import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry } from 'rxjs';
import * as ordersData from '.././../../public/mock_data/orders.json';
import { Order } from '../enums/Order';

@Injectable()
export class OrdersService {

  private data = ordersData;

getOrders(): Observable<Order[]> {
  return of(this.data.orders).pipe(
    retry(3), 
    catchError(error => {
      console.error('Error fetching orders:', error);
      return of([]); 
    })
  );
}
}

