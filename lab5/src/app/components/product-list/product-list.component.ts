import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products = input.required<Product[]>();
  remove = output<number>();
  toggleFavorite = output<number>();

  removeProduct(id: number): void {
    this.remove.emit(id);
  }

  onToggleFavorite(id: number): void {
    this.toggleFavorite.emit(id);
  }
}
