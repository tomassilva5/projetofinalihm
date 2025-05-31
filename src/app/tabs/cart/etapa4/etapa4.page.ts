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
  produto: any = {};
  total: number = 0;
  localEntrega: string = 'Recebe em casa';
  metodoPagamento: string = 'Cartão de Crédito';
  
  showDeliveryDetails: boolean = false;
  showPaymentDetails: boolean = false;

  morada: any = {};
  cartao: any = {};

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
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

  loadDataFromPreviousSteps() {
    const moradaData = localStorage.getItem('morada');
    if (moradaData) {
      try {
        this.morada = JSON.parse(moradaData);
      } catch (e) {
        this.morada = {
          rua: 'Rua das Flores, 123',
          codigoPostal: '1000-001 Lisboa',
          pais: 'Portugal'
        };
      }
    } else {
      this.morada = {
        rua: 'Rua das Flores, 123',
        codigoPostal: '1000-001 Lisboa',
        pais: 'Portugal'
      };
    }

    const pagamentoData = localStorage.getItem('metodoPagamento');
    const cartaoData = localStorage.getItem('dadosCartao');
    
    if (pagamentoData) {
      this.metodoPagamento = this.getPaymentName(pagamentoData);
    }

    if (cartaoData) {
      try {
        this.cartao = JSON.parse(cartaoData);
      } catch (e) {
        this.cartao = {
          nomeTitular: 'João Silva',
          numeroCartao: '1234567890123456',
          validade: '12/25'
        };
      }
    } else {
      this.cartao = {
        nomeTitular: 'João Silva', 
        numeroCartao: '1234567890123456',
        validade: '12/25'
      };
    }
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
  // Baseado no resultado [6] - determinar rota baseada no sucesso do pagamento
  const paymentSuccess = true; // Simula pagamento bem-sucedido
  
  if (paymentSuccess) {
    // Baseado no resultado [4] - navegação programática
    this.router.navigate(['/tabs/cart/sucesso']).then(
      (navigated) => {
        if (navigated) {
          console.log('Navegação bem-sucedida');
        } else {
          console.warn('Navegação falhou, tentando método alternativo');
          // Baseado no resultado [3] - fallback para redirecionamento
          window.location.href = '/tabs/cart/sucesso';
        }
      }
    ).catch((error) => {
      console.error('Erro na navegação:', error);
      // Fallback final
      window.location.href = '/tabs/cart/sucesso';
    });
  } else {
    // Se pagamento falhar
    console.log('Pagamento falhou');
    alert('Erro no pagamento');
  }
}


  }

