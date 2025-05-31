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
  selectedDelivery = '';
  total: number = 0;

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
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
      if (this.selectedDelivery === 'home') {
        this.router.navigate(['/tabs/cart/etapa2']);
      } else if (this.selectedDelivery === 'store') {
        this.router.navigate(['/tabs/cart/etapa2-loja']).catch(() => {
          this.router.navigate(['/working-on-it']);
        });
      }
    } else {
      alert('Selecione um local de entrega');
    }
  }
}
