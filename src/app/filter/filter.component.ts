import { Component, Input, OnInit } from '@angular/core';
import { Order, OrderStatus, ProductLine } from '../enums/Order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cmx-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit  {
  @Input() orders: Order[] = [];

  productLines: ProductLine[] = Object.values(ProductLine);
  orderStatuses: OrderStatus[] = Object.values(OrderStatus);

  ngOnInit(): void {
    this.productLines = Object.values(ProductLine);
    
    console.log(this.productLines);
  }

   trackById(index: number, productLines: ProductLine): number {
    return 1;
  }

}
