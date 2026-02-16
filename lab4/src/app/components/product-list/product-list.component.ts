import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../../models/product.model';

const STORAGE_KEY = 'qaspi_products';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, ProductCardComponent, AddProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  private http = inject(HttpClient);
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  selectedCategory: string = 'all';
  
  categories = [
    { id: 'all', label: 'All' },
    { id: 'consoles', label: 'Consoles' },
    { id: 'laptops', label: 'Laptops' },
    { id: 'phones', label: 'Phones' },
    { id: 'cars', label: 'Cars' },
    { id: 'musical instruments', label: 'Musical Instruments' }
  ];

  ngOnInit(): void {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0 && !parsed[0].category) {
        localStorage.removeItem(STORAGE_KEY);
        this.loadFromFile();
      } else {
        this.products = parsed;
        this.filteredProducts = this.products;
      }
    } else {
      this.loadFromFile();
    }
  }
  
  private loadFromFile(): void {
    this.http.get<Product[]>('data.json').subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.save();
      },
      error: (err) => console.error('Failed to load products:', err)
    });
  }

  addProduct(product: Product): void {
    this.products = [...this.products, product];
    this.save();
    this.filterProducts();
  }

  filterProducts(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(query);
      const matchesCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products));
  }
}
