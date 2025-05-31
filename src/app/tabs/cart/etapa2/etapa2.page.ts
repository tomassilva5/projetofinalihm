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
  IonInput // Certifica-te que IonInput está nos imports do componente
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-etapa2',
  templateUrl: './etapa2.page.html',
  styleUrls: ['./etapa2.page.scss'],
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
export class Etapa2Page implements OnInit {
  morada = {
    rua: '',
    codigoPostal: '',
    pais: ''
  };
  total: number = 0;
  isFormValid: boolean = false; // Controla o estado do botão

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    });
    // Verifica validade inicial (caso dados venham preenchidos)
    this.checkFormValidity();
  }

  goBack() {
    this.router.navigate(['/tabs/cart/etapa1']);
  }

  // Baseado no resultado [2] - validação em tempo real
  checkFormValidity() {
    // Verifica se todos os campos da morada estão preenchidos
    this.isFormValid = 
      this.morada.rua.trim() !== '' &&
      this.morada.codigoPostal.trim() !== '' &&
      this.morada.pais.trim() !== '';
  }

  continuar() {
    // A verificação já é feita pelo [disabled] do botão,
    // mas uma verificação extra aqui é boa prática.
    if (this.isFormValid) {
      localStorage.setItem('morada', JSON.stringify(this.morada));
      this.router.navigate(['/tabs/cart/etapa3']);
    } else {
      // Este alert só apareceria se o botão fosse clicável indevidamente
      alert('Preencha todos os campos da morada');
    }
  }
}
