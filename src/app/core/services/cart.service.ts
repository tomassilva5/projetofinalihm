import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { CartItem } from '../interfaces/cart-item.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    // Carrega carrinho do localStorage ao inicializar
    this.loadCart();
  }

  addToCart(product: Product) {
    const item = this.cart.find(p => p.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next([...this.cart]);
    this.saveCart();
  }

  // Método usado no cart.page.ts - recebe o produto inteiro
  increaseQuantity(product: CartItem) {
    const item = this.cart.find(p => p.id === product.id);
    if (item) {
      item.quantity += 1;
      this.cartSubject.next([...this.cart]);
      this.saveCart();
    }
  }

  // Método usado no cart.page.ts - recebe o produto inteiro
  decreaseQuantity(product: CartItem) {
    const item = this.cart.find(p => p.id === product.id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.cartSubject.next([...this.cart]);
      this.saveCart();
    } else if (item && item.quantity === 1) {
      this.removeFromCart(item);
    }
  }

  // Aliases para compatibilidade com nomes diferentes
  increaseProduct(product: CartItem) {
    this.increaseQuantity(product);
  }

  decreaseProduct(product: CartItem) {
    this.decreaseQuantity(product);
  }

  removeProduct(product: CartItem) {
    this.removeFromCart(product);
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next([]);
    this.saveCart();
  }

  removeFromCart(product: Product | CartItem) {
    const index = this.cart.findIndex(p => p.id === product.id);
    if (index > -1) {
      this.cart.splice(index, 1);
      this.cartSubject.next([...this.cart]);
      this.saveCart();
    }
  }

  // Métodos originais (por ID) para compatibilidade
  increaseQuantityById(productId: number) {
    const item = this.cart.find(p => p.id === productId);
    if (item) {
      item.quantity += 1;
      this.cartSubject.next([...this.cart]);
      this.saveCart();
    }
  }

  decreaseQuantityById(productId: number) {
    const item = this.cart.find(p => p.id === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.cartSubject.next([...this.cart]);
      this.saveCart();
    } else if (item && item.quantity === 1) {
      this.removeFromCart(item);
    }
  }

  // Persistência no localStorage
  private saveCart() {
    try {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  }

  private loadCart() {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
        this.cartSubject.next([...this.cart]);
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
      this.cart = [];
    }
  }
}
