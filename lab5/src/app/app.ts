import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './components/product-list/product-list.component';
import { Product } from './models/product.model';
import { CATEGORIES, PRODUCTS } from './data/products';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ProductListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  categories = CATEGORIES;
  products = PRODUCTS;
  favorites: Product[] = [];

  searchQuery: string = '';
  selectedCategory: number = -1;

  get filteredProducts(): Product[] {
    const query = this.searchQuery.toLowerCase();
    return this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(query);
      const matchesCategory = this.selectedCategory == -1 || product.category == this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  toggleFavorite(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;
    product.isFavorite = !product.isFavorite;
    this.favorites = this.products.filter(p => p.isFavorite);
  }

  onProductRemove(productId: number): void {
    this.products = this.products.filter(p => p.id !== productId);
    this.favorites = this.favorites.filter(p => p.id !== productId);
  }
}

