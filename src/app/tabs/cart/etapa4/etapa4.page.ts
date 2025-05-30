import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonButton, 
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-etapa4',
  templateUrl: './etapa4.page.html',
  styleUrls: ['./etapa4.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonButton, 
    IonIcon,
    CommonModule, 
    FormsModule
  ]
})
export class Etapa4Page implements OnInit {
  total: number = 500; // Preço fixo do Nokia 3110
  localEntrega: string = 'Recebe em casa';
  metodoPagamento: string = 'Cartão de Crédito';
  
  // Controla a expansão das seções
  showDeliveryDetails: boolean = false;
  showPaymentDetails: boolean = false;

  // Dados da morada (exemplo)
  morada = {
    rua: 'Rua das Flores, 123',
    codigoPostal: '1000-001 Lisboa',
    pais: 'Portugal'
  };

  // Dados do cartão (exemplo)
  cartao = {
    nomeTitular: 'João Silva',
    numeroCartao: '1234567890123456',
    validade: '12/25'
  };

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
    // Busca o preço real do carrinho
    this.cartService.cart$.subscribe(cart => {
      if (cart.length > 0) {
        const telemovel = cart[0];
        this.total = telemovel.price * telemovel.quantity;
      }
    });
  }

  goBack() {
    this.router.navigate(['/tabs/cart/etapa3']);
  }

  toggleDelivery() {
    this.showDeliveryDetails = !this.showDeliveryDetails;
  }

  togglePayment() {
    this.showPaymentDetails = !this.showPaymentDetails;
  }

  concluir() {
    alert('Compra de Nokia 3110 finalizada com sucesso!\nTotal: €' + this.total.toFixed(2));
    this.router.navigate(['/tabs/home']);
  }
}
