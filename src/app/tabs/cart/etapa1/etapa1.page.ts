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
  selector: 'app-etapa1',
  templateUrl: './etapa1.page.html',
  styleUrls: ['./etapa1.page.scss'],
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
export class Etapa1Page implements OnInit {
  selectedDelivery = ''; // Nenhuma opção selecionada por padrão
  total: number = 0;

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
    // Busca o valor total do carrinho
    this.cartService.cart$.subscribe(cart => {
      this.total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    });
  }

  goBack() {
    this.router.navigate(['/tabs/cart']);
  }

  selectDelivery(type: string) {
    this.selectedDelivery = type;
  }

  continuar() {
    if (this.selectedDelivery) {
      console.log('Opção selecionada:', this.selectedDelivery);
      console.log('Total do carrinho:', this.total);
      // this.router.navigate(['/tabs/cart/etapa2']);
    } else {
      // Mostrar aviso para selecionar uma opção
      alert('Selecione uma opção de entrega');
    }
  }
}
