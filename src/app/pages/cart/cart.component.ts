import { Component } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [CommonModule],
})
export class CartComponent {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCart();
  }

  readonly BOX_SIZE_M2 = 5;

  getBoxArea(item: CartItem): number {
    return item.quantity * this.BOX_SIZE_M2;
  }

  getItemTotal(item: CartItem): number {
    return this.getBoxArea(item) * item.tile.pricePerSqm;
  }

  getTotalArea(): number {
    return this.cartItems.reduce((sum, item) => sum + this.getBoxArea(item), 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + this.getItemTotal(item),
      0
    );
  }

  updateQuantity(item: CartItem, change: number) {
    const newBoxCount = item.quantity + change;
    this.cartService.updateQuantity(item.tile.id, newBoxCount);
    this.cartItems = this.cartService.getCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }
}
