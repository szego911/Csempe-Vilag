import { Injectable } from '@angular/core';
import { Tile } from './firestore.service';

const STORAGE_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];

  constructor() {
    this.loadCart();
  }

  private saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cart));
  }

  private loadCart() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      this.cart = JSON.parse(saved);
    }
  }

  addToCart(tile: Tile) {
    const item = this.cart.find((ci) => ci.tile.id === tile.id);
    if (item) {
      item.quantity += 1;
    } else {
      this.cart.push({ tile, quantity: 1 });
    }
    this.saveCart();
  }

  updateQuantity(tileId: string, newBoxes: number) {
    const item = this.cart.find((ci) => ci.tile.id === tileId);
    if (!item) return;

    item.quantity = Math.max(0, newBoxes);
    if (item.quantity === 0) {
      this.cart = this.cart.filter((ci) => ci.tile.id !== tileId);
    }
    this.saveCart();
  }

  getCart(): CartItem[] {
    return [...this.cart];
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  addTileQuantity(tile: Tile, quantity: number) {
    const item = this.cart.find((ci) => ci.tile.id === tile.id);
    if (item) {
      item.quantity += quantity;
    } else {
      this.cart.push({ tile, quantity });
    }
    this.saveCart();
  }
}

export interface CartItem {
  tile: Tile;
  quantity: number; // hány darabot rendel
}
