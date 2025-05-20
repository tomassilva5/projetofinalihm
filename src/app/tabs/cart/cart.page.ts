import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/angular/standalone';

interface Produto {
  nome: string;
  preco: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, CommonModule]
})
export class CartPage {
  produtos: Produto[] = [];
  subtotal: number = 0;
  envio: number = 0;
  total: number = 0;

  constructor() {}

  atualizarTotais() {
    this.subtotal = this.produtos.reduce((acc, p) => acc + p.preco, 0);
    this.envio = this.subtotal > 0 ? 2.5 : 0; // Exemplo de lógica de envio
    this.total = this.subtotal + this.envio;
  }

  adicionarProduto(produto: Produto) {
    this.produtos.push(produto);
    this.atualizarTotais();
  }

  removerProduto(index: number) {
    this.produtos.splice(index, 1);
    this.atualizarTotais();
  }
} 