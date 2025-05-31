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
  IonInput // Importa IonInput
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
    IonInput, // Adicionado aqui
    CommonModule, 
    FormsModule
  ]
})
export class Etapa3Page implements OnInit {
  selectedPayment = '';
  showCardForm = false;
  total: number = 0;
  isStepValid: boolean = false; // Controla o estado do botão
  
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
        const telemovel = cart[0]; // Assumindo que o primeiro item é o principal
        this.total = telemovel.price * telemovel.quantity;
      } else {
        this.total = 0;
      }
    });
    this.clearCardData(); // Limpa e define validade inicial
  }

  clearCardData() {
    this.selectedPayment = '';
    this.showCardForm = false;
    this.cartao = {
      nomeTitular: '',
      numeroCartao: '',
      validade: '',
      cvv: ''
    };
    this.checkStepValidity(); // Verifica validade após limpar
  }

  goBack() {
    if (this.showCardForm) {
      this.showCardForm = false;
      this.selectedPayment = ''; // Desseleciona "Cartão"
      this.checkStepValidity(); // Revalida o estado do botão
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
      // Validação para o formulário do cartão
      this.isStepValid = 
        this.cartao.nomeTitular.trim() !== '' &&
        this.cartao.numeroCartao.trim() !== '' && // Adicionar validação de formato se necessário
        this.cartao.validade.trim().length === 5 && // Ex: MM/AA
        this.cartao.cvv.trim().length === 3;
    } else {
      this.isStepValid = this.selectedPayment !== '';
    }
  }
  
  // Função para formatar a data de validade automaticamente com "/"
  formatExpiryDate() {
    let value = this.cartao.validade.replace(/\D/g, ''); // Remove não dígitos
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.cartao.validade = value;
  }

  continuar() {
    if (!this.isStepValid) {
        // Se, por alguma razão, o botão estiver ativo mas a validação falhar,
        // mostra um alerta (ou nada, já que o botão deve estar desabilitado).
        if (this.showCardForm) {
            alert('Preencha todos os campos do cartão corretamente.');
        } else {
            alert('Selecione um método de pagamento.');
        }
        return;
    }

    if (this.showCardForm) {
      // Já estamos no formulário do cartão, e ele é válido (isStepValid = true)
      localStorage.setItem('metodoPagamento', 'cartao');
      localStorage.setItem('dadosCartao', JSON.stringify(this.cartao));
      this.router.navigate(['/tabs/cart/etapa4']);
    } else {
      // Estamos na seleção de método de pagamento
      if (this.selectedPayment === 'cartao') {
        this.showCardForm = true; // Mostra o formulário do cartão
        this.checkStepValidity(); // Revalida (botão será desabilitado até preencher o form)
      } else if (this.selectedPayment) {
        // Outro método de pagamento selecionado e válido
        localStorage.setItem('metodoPagamento', this.selectedPayment);
        this.router.navigate(['/tabs/cart/etapa4']);
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
