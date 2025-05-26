import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/angular/standalone';
import { CartService } from 'src/app/core/services/cart.service';
import { CartItem } from 'src/app/core/interfaces/cart-item.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, CommonModule]
})
export class CartPage implements OnInit {
  produtos: CartItem[] = [];
  subtotal: number = 0;
  envio: number = 0;
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.produtos = cart;
      this.atualizarTotais();
    });
  }

  atualizarTotais() {
    this.subtotal = this.produtos.reduce((acc, p) => acc + p.price * p.quantity, 0);
    this.envio = this.subtotal > 0 ? 2.5 : 0; // Exemplo de lógica de envio
    this.total = this.subtotal + this.envio;
  }

  increaseQuantity(index: number) {
    const produto = this.produtos[index];
    this.cartService.increaseQuantity(produto.id);
  }

  decreaseQuantity(index: number) {
    const produto = this.produtos[index];
    this.cartService.decreaseQuantity(produto.id);
  }

  adicionarProduto(produto: CartItem) {
    this.cartService.addToCart(produto);
  }

  removerProduto(index: number) {
    const produtoRemovido = this.produtos.splice(index, 1)[0];
    this.cartService.removeFromCart(produtoRemovido);
    this.atualizarTotais();
  }
} 