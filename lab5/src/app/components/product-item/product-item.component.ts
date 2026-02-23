import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
    product = input.required<Product>();
    delete = output<number>();
    toggleFavorite = output<number>();

    selectedImage = 0;
    shareOpen = false;
    readonly stars = [1, 2, 3, 4, 5];

    selectImage(index: number): void {
        this.selectedImage = index;
    }

    prevImage(): void {
        this.selectedImage = (this.selectedImage - 1 + this.product().images.length) % this.product().images.length;
    }

    nextImage(): void {
        this.selectedImage = (this.selectedImage + 1) % this.product().images.length;
    }

    toggleShare(): void {
        this.shareOpen = !this.shareOpen;
    }

    share(platform: 'whatsapp' | 'telegram'): void {
        const urls = {
            whatsapp: `https://wa.me/?text=${encodeURIComponent('Check out this product: ' + this.product().link)}`,
            telegram: `https://t.me/share/url?url=${encodeURIComponent(this.product().link)}&text=${encodeURIComponent(this.product().name)}`
        };
        window.open(urls[platform], '_blank');
        this.shareOpen = false;
    }

    formatPrice(price: number): string {
        return price.toLocaleString('ru-KZ');
    }

    getInstallment(price: number): number {
        return Math.ceil(price / 3);
    }

    like(): void {
        this.product().likes++;
    }

    remove(): void {
        this.delete.emit(this.product().id);
    }

    onToggleFavorite(): void {
        this.toggleFavorite.emit(this.product().id);
    }
}
