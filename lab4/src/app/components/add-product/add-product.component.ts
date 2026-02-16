import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  @Output() productAdded = new EventEmitter<Product>();

  formOpen = false;
  form = {
    name: '',
    description: '',
    price: null as number | null,
    rating: 5,
    category: 'consoles',
    imageUrl: '',
    link: '',
  };
  
  categories = [
    { id: 'consoles', label: 'Consoles' },
    { id: 'laptops', label: 'Laptops' },
    { id: 'phones', label: 'Phones' },
    { id: 'cars', label: 'Cars' },
    { id: 'musical instruments', label: 'Musical Instruments' }
  ];

  toggleForm(): void {
    this.formOpen = !this.formOpen;
  }

  submit(): void {
    if (!this.form.name || !this.form.price || !this.form.imageUrl) return;

    const product: Product = {
      id: Date.now(),
      name: this.form.name,
      description: this.form.description,
      price: this.form.price,
      rating: this.form.rating,
      category: this.form.category,
      image: this.form.imageUrl,
      images: [this.form.imageUrl],
      link: this.form.link || '#',
    };

    this.productAdded.emit(product);
    this.resetForm();
  }

  private resetForm(): void {
    this.form = { name: '', description: '', price: null, rating: 5, category: 'consoles', imageUrl: '', link: '' };
    this.formOpen = false;
  }
}
