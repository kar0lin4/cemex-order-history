import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { OrderStatus, ProductLine } from '../enums/Order';
import { FilterService } from '../services/filter.service';

export interface ActiveFilter {
  statuses: string[];
  productLine: string;
  dateFrom: string;
  dateTo: string;
  searchByOrderNumber: string;
}

// If I would have more time to work on this filter component, 
// I would create components of filters (children) 
// and add them separately in this component
@Component({
  selector: 'cmx-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  selectedStatuses: string[] = [];
  selectedProductLine!: ProductLine;
  activeFilter: ActiveFilter = {
    statuses: [],
    productLine: '',
    dateFrom: '',
    dateTo: '',
    searchByOrderNumber: '',
  };
  productLines: ProductLine[] = Object.values(ProductLine);
  orderStatuses: OrderStatus[] = Object.values(OrderStatus);
  todayDate: string = this.formatDate(new Date());

  productLine = new FormControl('');
  dateFrom = new FormControl('');
  dateTo = new FormControl(this.todayDate);
  orderNumber = new FormControl('');

  constructor(private filterService: FilterService) {
    this.filterService.filter$
      .pipe(takeUntilDestroyed())
      .subscribe((filter) => {
        this.activeFilter = filter;
      });

    this.dateTo.setValue(this.todayDate);
  }

  onStatusChange(status: string, event: any) {
    if (event.target.checked) {
      this.selectedStatuses.push(status);
    } else {
      const index = this.selectedStatuses.indexOf(status);
      if (index > -1) {
        this.selectedStatuses.splice(index, 1);
      }
    }
    this.updateStatuses(this.selectedStatuses);
  }

  onProductLineChange(productLine: string) {
    if (productLine === ProductLine.ReadyMix) {
      productLine = 'Ready-Mix';
    }
    this.updateProductLine(productLine);
  }

  onDateFromChange(date: string) {
    this.updateDateFrom(date);
  }

  onDateToChange(date: string) {
    this.updateDateTo(date);
  }

  onSearchedOrderNumberChange(orderNumber: string) {
    this.updateSearchByOrderNumber(orderNumber);
  }

  updateProductLine(productLine: string) {
    this.filterService.updateFilter({ productLine });
  }

  updateStatuses(statuses: string[]) {
    this.filterService.updateFilter({ statuses });
  }

  updateDateFrom(dateFrom: string) {
    this.filterService.updateFilter({ dateFrom: dateFrom });
  }

  updateDateTo(dateTo: string) {
    this.filterService.updateFilter({ dateTo: dateTo });
  }

  updateSearchByOrderNumber(orderNumber: string) {
    this.filterService.updateFilter({ searchByOrderNumber: orderNumber });
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }
}
