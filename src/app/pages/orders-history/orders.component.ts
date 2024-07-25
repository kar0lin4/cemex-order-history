import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AddSpacePipe } from '../../add-space.pipe';
import { Order, OrderStatus } from '../../enums/Order';
import { FilterComponent } from '../../filter/filter.component';
import { OrdersService } from '../../services/orders.service';
import { NoResultsComponent } from '../no-results/no-results.component';

enum OrderListColumnHeaders {
  Status ='Status',
  ONumber = 'Order Number',
  PLine = 'Product Line',
  P = 'Product',
  Quantity = 'Quantity',
  Date = 'Date Requested'
}

@Component({
  selector: 'cmx-orders',
  standalone: true,
  imports: [
    CommonModule,
    NoResultsComponent,
    AddSpacePipe,
    FilterComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [OrdersService],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders$!: Observable<Order[]>;
  orders: Order[] = [];
  filteredOrders: Order[] = [];

  displayedColumns: OrderListColumnHeaders[] = Object.values(OrderListColumnHeaders);
  orderStatus: OrderStatus[] = Object.values(OrderStatus);
  
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.orders$ = this.ordersService.getOrders().pipe(takeUntil(this.destroy$));
    this.orders$.subscribe(orders => this.orders = orders)
  }

  getOrderStatusClass(status: string): string {
    switch (status) {
      case OrderStatus.Pending:
        return 'pending';
      case OrderStatus.InProgress:
        return 'in-progress';
      case OrderStatus.Completed:
        return 'completed';
      default:
        return '';
    }
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
