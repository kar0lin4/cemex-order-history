import { Component } from '@angular/core';
import { ProductsComponent } from './pages/products-list/products.component';
import { NoResultsComponent } from "./pages/no-results/no-results.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsComponent, NoResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Order History';
}
