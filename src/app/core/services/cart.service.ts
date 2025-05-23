import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cart);
  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product) {
    this.cart.push(product);
    this.cartSubject.next([...this.cart]);
  }

  getCart(): Product[] {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next([]);
  }
} 