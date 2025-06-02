import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-etapa4',
  templateUrl: './etapa4.page.html',
  styleUrls: ['./etapa4.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon,
    CommonModule, FormsModule
  ]
})
export class Etapa4Page implements OnInit {
  produto: any = {};
  total = 0;
  localEntrega = 'Recebe em casa';
  metodoPagamento = 'Cartão de Crédito';
  showDeliveryDetails = false;
  showPaymentDetails = false;
  morada: any = {};
  cartao: any = {};

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // Obtem produto do carrinho ou usa valores padrão
    this.cartService.cart$.subscribe(cart => {
      if (cart.length > 0) {
        this.produto = cart[0];
        this.total = this.produto.price * this.produto.quantity;
      } else {
        this.produto = {
          name: 'Nokia 3110',
          price: 618,
          image: 'assets/images/nokia-3110.png',
          quantity: 1
        };
        this.total = 618;
      }
    });
    this.loadDataFromPreviousSteps();
  }

  // Carrega morada e pagamento dos passos anteriores 
  loadDataFromPreviousSteps() {
    const moradaData = localStorage.getItem('morada');
    this.morada = moradaData ? this.safeParse(moradaData, {
      rua: 'Rua das Flores, 123',
      codigoPostal: '1000-001 Lisboa',
      pais: 'Portugal'
    }) : {
      rua: 'Rua das Flores, 123',
      codigoPostal: '1000-001 Lisboa',
      pais: 'Portugal'
    };

    const pagamentoData = localStorage.getItem('metodoPagamento');
    if (pagamentoData) {
      this.metodoPagamento = this.getPaymentName(pagamentoData);
    }

    const cartaoData = localStorage.getItem('dadosCartao');
    this.cartao = cartaoData ? this.safeParse(cartaoData, {
      nomeTitular: 'João Silva',
      numeroCartao: '1234567890123456',
      validade: '12/25'
    }) : {
      nomeTitular: 'João Silva',
      numeroCartao: '1234567890123456',
      validade: '12/25'
    };
  }

  private safeParse(str: string, fallback: any) {
    try { return JSON.parse(str); } catch { return fallback; }
  }

  getPaymentName(type: string): string {
    switch(type) {
      case 'cartao': return 'Cartão de Crédito';
      case 'universo': return 'Cartão Universo';
      case 'referencia': return 'Referência Multibanco';
      case 'mbway': return 'MB Way';
      default: return 'Cartão de Crédito';
    }
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
    // Pagamento bem-sucedido e navega para sucesso
    const paymentSuccess = true;
    if (paymentSuccess) {
      this.router.navigate(['/tabs/cart/sucesso']).then(navigated => {
        if (!navigated) window.location.href = '/tabs/cart/sucesso';
      }).catch(() => window.location.href = '/tabs/cart/sucesso');
    } else {
      alert('Erro no pagamento');
    }
  }
}
