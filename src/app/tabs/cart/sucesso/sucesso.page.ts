import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { 
  IonContent, 
  IonButton
} from '@ionic/angular/standalone';

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
  ) { }

  ngOnInit() {
    // Limpa carrinho imediatamente ao carregar página de sucesso
    this.clearCartAndData();
  }

  clearCartAndData() {
    // Baseado no resultado [2] - limpar carrinho após checkout bem-sucedido
    this.cartService.clearCart();
    
    // Baseado no resultado [3] - limpar localStorage no Ionic
    localStorage.removeItem('morada');
    localStorage.removeItem('metodoPagamento');
    localStorage.removeItem('dadosCartao');
    localStorage.removeItem('tipoEntrega');
    
    // Limpa cache se necessário
    localStorage.clear();
  }

  terminar() {
    // Garante que carrinho está limpo antes de navegar
    this.clearCartAndData();
    this.router.navigate(['/tabs/home']);
  }
}
