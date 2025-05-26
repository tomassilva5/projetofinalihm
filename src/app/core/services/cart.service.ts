import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { CartItem } from '../interfaces/cart-item.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);
  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product) {
    const item = this.cart.find(p => p.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next([...this.cart]);
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next([]);
  }

  removeFromCart(product: Product) {
    const index = this.cart.findIndex(p => p.id === product.id);
    if (index > -1) {
      this.cart.splice(index, 1);
      this.cartSubject.next([...this.cart]);
    }
  }

  increaseQuantity(productId: number) {
    const item = this.cart.find(p => p.id === productId);
    if (item) {
      item.quantity += 1;
      this.cartSubject.next([...this.cart]);
    }
  }

  decreaseQuantity(productId: number) {
    const item = this.cart.find(p => p.id === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.cartSubject.next([...this.cart]);
    } else if (item && item.quantity === 1) {
      this.removeFromCart(item);
    }
  }
} 