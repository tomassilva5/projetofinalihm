import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonInput } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-etapa3',
  templateUrl: './etapa3.page.html',
  styleUrls: ['./etapa3.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonInput,
    CommonModule, FormsModule
  ]
})
export class Etapa3Page implements OnInit {
  selectedPayment = '';
  showCardForm = false;
  total = 0;
  isStepValid = false;

  cartao = {
    nomeTitular: '',
    numeroCartao: '',
    validade: '',
    cvv: ''
  };

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // Atualiza o total do carrinho
    this.cartService.cart$.subscribe(cart => {
      this.total = cart.length > 0 ? cart[0].price * cart[0].quantity : 0;
    });
    this.clearCardData();
  }

  clearCardData() {
    this.selectedPayment = '';
    this.showCardForm = false;
    this.cartao = { nomeTitular: '', numeroCartao: '', validade: '', cvv: '' };
    this.checkStepValidity();
  }

  goBack() {
    if (this.showCardForm) {
      this.showCardForm = false;
      this.selectedPayment = '';
      this.checkStepValidity();
    } else {
      this.router.navigate(['/tabs/cart/etapa2']);
    }
  }

  selectPayment(type: string) {
    this.selectedPayment = type;
    this.checkStepValidity();
  }

  checkStepValidity() {
    if (this.showCardForm) {
      this.isStepValid =
        this.cartao.nomeTitular.trim() !== '' &&
        this.cartao.numeroCartao.trim() !== '' &&
        this.cartao.validade.trim().length === 5 &&
        this.cartao.cvv.trim().length === 3;
    } else {
      this.isStepValid = this.selectedPayment !== '';
    }
  }

  formatExpiryDate() {
    let value = this.cartao.validade.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.cartao.validade = value;
  }

  continuar() {
    if (!this.isStepValid) {
      alert(this.showCardForm
        ? 'Preencha todos os campos do cartão corretamente.'
        : 'Selecione um método de pagamento.');
      return;
    }
    if (this.showCardForm) {
      localStorage.setItem('metodoPagamento', 'cartao');
      localStorage.setItem('dadosCartao', JSON.stringify(this.cartao));
      this.router.navigate(['/tabs/cart/etapa4']);
    } else if (this.selectedPayment === 'cartao') {
      this.showCardForm = true;
      this.checkStepValidity();
    } else {
      localStorage.setItem('metodoPagamento', this.selectedPayment);
      this.router.navigate(['/tabs/cart/etapa4']);
    }
  }

  // Retorna o nome do método de pagamento selecionado
  getPaymentName(): string {
    switch (this.selectedPayment) {
      case 'cartao': return 'Cartão de Crédito';
      case 'universo': return 'Cartão Universo';
      case 'referencia': return 'Referência Multibanco';
      case 'mbway': return 'MB Way';
      default: return '';
    }
  }
}
