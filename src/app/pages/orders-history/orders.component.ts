import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AddSpacePipe } from '../../add-space.pipe';
import { Order, OrderStatus } from '../../enums/Order';
import { OrdersService } from '../../services/orders.service';
import { NoResultsComponent } from '../no-results/no-results.component';


@Component({
  selector: 'cmx-orders',
  standalone: true,
  imports: [CommonModule, NoResultsComponent, AddSpacePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [OrdersService]
})
export class OrdersComponent implements OnInit  {
  displayedColumns: string[] = ['Status', 'Order Number', 'Product Line', 'Product', 'Quantity', 'Date Requested'];
  orders$!: Observable<Order[]>;
  orderStatus: typeof OrderStatus = OrderStatus;

  constructor(private ordersService: OrdersService){}
  
  ngOnInit() {
    console.log(this.orderStatus)
    this.orders$ = this.ordersService.getOrders();
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

}
