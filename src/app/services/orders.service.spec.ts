import { TestBed } from '@angular/core/testing';

import { OrdersService } from './orders.service';
import { Order } from '../enums/Order';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of orders', (done: DoneFn) => {
    // Define the expected result
    const expectedOrders: Order[] = [
      {id:8, productName:"Trencher", status :"Completed", line :"Sand", unit:"TN", orderNumber :2939, quantity :3.2, requestDate :"09.02.2023"},
      {id:4, productName:"Trencher", status :"InProgress", line :"Cement", unit:"TN", orderNumber :5577, quantity :32, requestDate :"19.12.2020"},

    ];

    const orders$ = service.getOrders();

    orders$.subscribe(orders => {
      expect(orders).toEqual(expectedOrders);
    });
  });
});
