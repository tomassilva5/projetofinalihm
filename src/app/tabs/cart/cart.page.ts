import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle,
    IonButton,
    IonIcon,
    CommonModule, 
    FormsModule
  ]
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  isEmpty: boolean = true;

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.isEmpty = cart.length === 0;
      
      if (!this.isEmpty) {
        this.total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      } else {
        this.total = 0;
      }
    });
  }

  // Baseado no resultado [6] - método para aumentar quantidade
  increaseQuantity(product: any) {
    // Chama método do CartService para aumentar quantidade
    this.cartService.increaseProduct(product);
  }

  // Baseado no resultado [6] - método para diminuir quantidade  
  decreaseQuantity(product: any) {
    // Chama método do CartService para diminuir quantidade
    this.cartService.decreaseProduct(product);
  }

  // Método adicional para remover produto completamente
  removeItem(product: any) {
    this.cartService.removeProduct(product);
  }

  comprar() {
    if (!this.isEmpty) {
      this.router.navigate(['/tabs/cart/etapa1']);
    }
  }
}
