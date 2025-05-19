import { Component } from '@angular/core';
import {
  IonContent,
  IonIcon,
  IonTabs,
  IonTabBar,
  IonTabButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonTabs, IonTabBar, IonTabButton]
})
export class HomePage {
  produtos = [
    { img: 'assets/produtos/xiaomi15ultra.jpg', preco: '1424,98€', nome: 'Xiaomi 15 Ultra' },
    { img: 'assets/produtos/iphone16promax.jpg', preco: '1371.00€', nome: 'Iphone 16 Pro Max' },
    { img: 'assets/produtos/asusvivobook.jpg', preco: '899,99€', nome: 'ASUS Vivobook' },
    { img: 'assets/produtos/smarttvlg.jpg', preco: '25.737,83€', nome: 'Smart Tv LG' },
    { img: 'assets/produtos/tvsamsung.jpg', preco: '5164,33€', nome: 'Tv Samsung' },
    { img: 'assets/produtos/ps5pro.jpg', preco: '799,99€', nome: 'PS5 Pro' }
  ];
}
