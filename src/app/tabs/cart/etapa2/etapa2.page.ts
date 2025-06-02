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
    IonInput,
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
  isFormValid: boolean = false; 

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    });
    this.checkFormValidity();
  }

  goBack() {
    this.router.navigate(['/tabs/cart/etapa1']);
  }

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
