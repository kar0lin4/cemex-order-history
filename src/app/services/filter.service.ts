import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveFilter } from '../pages/filter/filter.component';
import { Order } from '../enums/Order';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  private defaultFilter: ActiveFilter = {
    statuses: [],
    productLine: '',
    dateFrom: '',
    dateTo: '',
    searchByOrderNumber: '',
  };

  private filterSubject = new BehaviorSubject<ActiveFilter>(this.defaultFilter);
  filter$ = this.filterSubject.asObservable();

  updateFilter(newFilter: Partial<ActiveFilter>) {
    const currentFilter = this.filterSubject.value;
    const updatedFilter = { ...currentFilter, ...newFilter };
    this.filterSubject.next(updatedFilter);
  }

  getFilteredOrders(orders: Order[]): Order[] {
    const currentFilter = this.filterSubject.value;
    return orders.filter((order) => {
      const statusMatch =
        currentFilter.statuses.length === 0 ||
        currentFilter.statuses.includes(order.status);

      const lineMatch =
        currentFilter.productLine === '' ||
        order.line === currentFilter.productLine;

      const dateFromMatch =
        !currentFilter.dateFrom ||
        new Date(
          order.requestDate.toString().replace(this.pattern, '$3-$2-$1')
        ) >= new Date(currentFilter.dateFrom);

      const dateToMatch =
        !currentFilter.dateTo ||
        new Date(
          order.requestDate.toString().replace(this.pattern, '$3-$2-$1')
        ) <= new Date(currentFilter.dateTo);

      const searchByOrderNumberMatch =
        currentFilter.searchByOrderNumber === '' ||
        order.orderNumber
          .toString()
          .includes(currentFilter.searchByOrderNumber!);

      return (
        statusMatch &&
        lineMatch &&
        dateFromMatch &&
        dateToMatch &&
        searchByOrderNumberMatch
      );
    });
  }

  resetFilter() {
    this.filterSubject.next(this.defaultFilter);
  }
}
