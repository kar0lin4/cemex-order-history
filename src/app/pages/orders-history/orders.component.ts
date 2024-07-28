import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AddSpacePipe } from '../../add-space.pipe';
import { Order, OrderStatus } from '../../enums/Order';
import { FilterComponent } from '../../filter/filter.component';
import { FilterService } from '../../services/filter.service';
import { OrdersService } from '../../services/orders.service';
import { NoResultsComponent } from '../no-results/no-results.component';

enum OrderListColumnHeaders {
  Status = 'Status',
  OrderNumber = 'Order Number',
  ProductLine = 'Product Line',
  Product = 'Product',
  Quantity = 'Quantity',
  Date = 'Date Requested',
}

@Component({
  selector: 'cmx-orders',
  standalone: true,
  imports: [CommonModule, NoResultsComponent, AddSpacePipe, FilterComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [OrdersService],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders$!: Observable<Order[]>;
  orders: Order[] = [];
  filteredOrders: Order[] = [];

  displayedColumns: OrderListColumnHeaders[] = Object.values(
    OrderListColumnHeaders
  );
  orderStatus: OrderStatus[] = Object.values(OrderStatus);
  private destroyed$: Subject<boolean> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    // While working on a real data from the server, I would add a resolver that would do the sorting
    // I would also keep the application state in the store, add a loading property to the reducer,
    // as well as a loading flag in this component and display loading component while waiting for the data

    this.orders$ = this.ordersService.getOrders().pipe(takeUntil(this.destroyed$));
    this.orders$.pipe(takeUntil(this.destroyed$)).subscribe((orders) => {
      this.orders = orders;
    });

    this.filterService.filter$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        const sortedOrders = [...this.sortOrdersByDate(this.orders)];
        this.filteredOrders = this.filterService.getFilteredOrders(sortedOrders);
      });
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


  sortOrdersByDate(orders: Order[]): Order[] {
    return orders.sort((order, nextOrder) => {
      const [dayA, monthA, yearA] = order.requestDate.split('.').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
  
      const [dayB, monthB, yearB] = nextOrder.requestDate.split('.').map(Number);
      const dateB = new Date(yearB, monthB - 1, dayB);
  
      return dateB.getTime() - dateA.getTime()  ;
    });
  }


  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
