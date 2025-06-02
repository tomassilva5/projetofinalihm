import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sucesso',
  templateUrl: './sucesso.page.html',
  styleUrls: ['./sucesso.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    CommonModule
  ]
})
export class SucessoPage implements OnInit {

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.clearCartAndData();
  }

  clearCartAndData() {
    // Limpa o carrinho e dados de checkout
    this.cartService.clearCart();
    localStorage.removeItem('morada');
    localStorage.removeItem('metodoPagamento');
    localStorage.removeItem('dadosCartao');
    localStorage.removeItem('tipoEntrega');
  }

  terminar() {
    this.clearCartAndData();
    this.router.navigate(['/tabs/home']);
  }
}
