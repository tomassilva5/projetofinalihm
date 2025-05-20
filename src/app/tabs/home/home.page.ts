import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon] // Só o que realmente usas!
})
export class HomePage {
  produtos = [
    { img: 'assets/icon/produtos/xiaomi 15 ultra.png', preco: '1424,98€', nome: 'Xiaomi 15 Ultra' },
    { img: 'assets/icon/produtos/iphone 16 pro max.png', preco: '1371.00€', nome: 'Iphone 16 Pro Max' },
    { img: 'assets/icon/produtos/asusvivobook.png', preco: '899,99€', nome: 'ASUS Vivobook' },
    { img: 'assets/icon/produtos/LG tv.png', preco: '17.360,00€', nome: 'Smart Tv LG' },
    { img: 'assets/icon/produtos/Samsung tv.png', preco: '5164,33€', nome: 'Tv Samsung' },
    { img: 'assets/icon/produtos/ps5 pro.png', preco: '799,99€', nome: 'PS5 Pro' }
  ];
}
