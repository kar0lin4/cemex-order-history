import { Component } from '@angular/core';
import { OrdersComponent } from './pages/orders-history/orders.component';
import { NoResultsComponent } from "./pages/no-results/no-results.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OrdersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Order History';
}
