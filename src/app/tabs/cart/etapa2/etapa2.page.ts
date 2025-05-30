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

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
    // Busca o valor total do carrinho (só o telemóvel)
    this.cartService.cart$.subscribe(cart => {
      if (cart.length > 0) {
        const telemovel = cart[0]; // Primeiro produto (telemóvel)
        this.total = telemovel.price * telemovel.quantity;
      } else {
        this.total = 0;
      }
    });
  }

  goBack() {
    this.router.navigate(['/tabs/cart/etapa1']);
  }

  continuar() {
    if (this.morada.rua && this.morada.codigoPostal && this.morada.pais) {
      console.log('Morada preenchida:', this.morada);
      console.log('Total:', this.total);
      // Navegar para etapa3 (Método de Pagamento)
      this.router.navigate(['/tabs/cart/etapa3']);
    } else {
      alert('Preencha todos os campos da morada');
    }
  }
}
