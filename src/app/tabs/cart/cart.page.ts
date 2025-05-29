import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { CartService } from 'src/app/core/services/cart.service';
import { CartItem } from 'src/app/core/interfaces/cart-item.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, CommonModule]
})
export class CartPage implements OnInit {
  produtos: CartItem[] = [];
  subtotal: number = 0;
  envio: number = 0;
  total: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.produtos = cart;
      this.atualizarTotais();
    });
  }

  atualizarTotais() {
    // Total = apenas o valor do primeiro produto (telemóvel)
    if (this.produtos.length > 0) {
      const telemovel = this.produtos[0]; // Primeiro produto (telemóvel)
      this.total = telemovel.price * telemovel.quantity;
    } else {
      this.total = 0;
    }
    
    // Subtotal e envio podem ficar como estavam (se precisares para outros cálculos)
    this.subtotal = this.produtos.reduce((acc, p) => acc + p.price * p.quantity, 0);
    this.envio = 0; // Remove custos de envio
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

  comprar() {
    this.router.navigate(['/tabs/cart/etapa1']);
  }
}
