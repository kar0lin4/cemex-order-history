import { TestBed } from '@angular/core/testing';
import { FilterService } from './filter.service';
import { ActiveFilter } from '../pages/filter/filter.component';
import { Order } from '../enums/Order';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('updateFilter', () => {
    it('should update the filter', () => {
      const newFilter: Partial<ActiveFilter> = { productLine: 'Sand' };
      service.updateFilter(newFilter);
  
      service.filter$.subscribe(filter => {
        expect(filter.productLine).toBe('Sand');
      });
    });
  
    it('should merge the new filter with the existing filter', () => {
      const initialFilter: Partial<ActiveFilter> = { productLine: 'Sand' };
      service.updateFilter(initialFilter);
  
      const updatedFilter: Partial<ActiveFilter> = { statuses: ['Completed'] };
      service.updateFilter(updatedFilter);
  
      service.filter$.subscribe(filter => {
        expect(filter.productLine).toBe('Sand');
        expect(filter.statuses).toContain('Completed');
      });
    });
  });
  describe('getFilteredOrders', () => {
    it('should return orders that match the filter', () => {
      const orders: Order[] = [
        {"id":8,"productName":"Trencher","status":"Completed","line":"Sand","unit":"TN","orderNumber":2939,"quantity":3.2,"requestDate":"09.02.2023"},
        {"id":9,"productName":"Skid-Steer","status":"Completed","line":"Sand","unit":"TN","orderNumber":2549,"quantity":9.8,"requestDate":"18.03.2023"},

      ];
  
      service.updateFilter({ statuses: ['Completed'], productLine: 'Sand' });
  
      const filteredOrders = service.getFilteredOrders(orders);
  
      expect(filteredOrders.length).toBe(2);
    });
  
    it('should handle empty filters', () => {
      const orders: Order[] = [
        {"id":8,"productName":"Trencher","status":"Completed","line":"Sand","unit":"TN","orderNumber":2939,"quantity":3.2,"requestDate":"09.02.2023"},
        {"id":9,"productName":"Skid-Steer","status":"Completed","line":"Sand","unit":"TN","orderNumber":2549,"quantity":9.8,"requestDate":"18.03.2023"},
      ];
  
      service.updateFilter({}); 
  
      const filteredOrders = service.getFilteredOrders(orders);
  
      expect(filteredOrders.length).toBe(2); 
    });
  
    it('should handle date range filters', () => {
      const orders: Order[] = [
        {"id":7,"productName":"Skid-Steer","status":"Pending","line":"Ready-Mix","unit":"m3","orderNumber":4229,"quantity":10.4,"requestDate":"04.11.2022"},
        {"id":8,"productName":"Trencher","status":"Completed","line":"Sand","unit":"TN","orderNumber":2939,"quantity":3.2,"requestDate":"09.02.2023"},
        {"id":9,"productName":"Skid-Steer","status":"Completed","line":"Sand","unit":"TN","orderNumber":2549,"quantity":9.8,"requestDate":"18.03.2023"},
      ];
  
      service.updateFilter({ dateFrom: '01.01.2024', dateTo: '01.01.2024' });
  
      const filteredOrders = service.getFilteredOrders(orders);
  
      expect(filteredOrders.length).toBe(1);
      expect(filteredOrders[0].orderNumber).toBe(4229);
    });
  });
  describe('resetFilter', () => {
    it('should reset the filter to default', () => {
      const newFilter: Partial<ActiveFilter> = { productLine: 'Sand' };
      service.updateFilter(newFilter);
  
      service.resetFilter();
  
      service.filter$.subscribe(filter => {
        expect(filter).toEqual(service['defaultFilter']);
      });
    });
  });
      
});
