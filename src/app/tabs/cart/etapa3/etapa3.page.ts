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
  IonIcon,
  IonInput
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-etapa3',
  templateUrl: './etapa3.page.html',
  styleUrls: ['./etapa3.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonButton, 
    IonIcon,
    IonInput,
    CommonModule, 
    FormsModule
  ]
})
export class Etapa3Page implements OnInit {
  selectedPayment = '';
  showCardForm = false;
  total: number = 0;
  
  cartao = {
    nomeTitular: '',
    numeroCartao: '',
    validade: '',
    cvv: ''
  };

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      if (cart.length > 0) {
        const telemovel = cart[0];
        this.total = telemovel.price * telemovel.quantity;
      } else {
        this.total = 0;
      }
    });
  }

  goBack() {
    if (this.showCardForm) {
      this.showCardForm = false;
      this.selectedPayment = '';
    } else {
      this.router.navigate(['/tabs/cart/etapa2']);
    }
  }

  selectPayment(type: string) {
    this.selectedPayment = type;
  }

  continuar() {
  if (this.showCardForm) {
    if (this.cartao.nomeTitular && this.cartao.numeroCartao && this.cartao.validade && this.cartao.cvv) {
      // Navegação direta para evitar problemas de routing
      window.location.href = '/tabs/cart/etapa4';
    } else {
      alert('Preencha todos os campos do cartão');
    }
  } else {
    if (this.selectedPayment === 'cartao') {
      this.showCardForm = true;
    } else if (this.selectedPayment) {
      window.location.href = '/tabs/cart/etapa4';
    } else {
      alert('Selecione um método de pagamento');
    }
  }
}


  getPaymentName(): string {
    switch(this.selectedPayment) {
      case 'cartao': return 'Cartão de Crédito';
      case 'universo': return 'Cartão Universo';
      case 'referencia': return 'Referência Multibanco';
      case 'mbway': return 'MB Way';
      default: return '';
    }
  }
}
