import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-telemoveis',
  templateUrl: './telemoveis.page.html',
  styleUrls: ['./telemoveis.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon] // <-- IMPORTANTE!
})
export class TelemoveisPage {
  telemoveis = [
    { img: 'assets/produtos/xiaomi15ultra.jpg', preco: '1424,98€', nome: 'Xiaomi 15 Ultra' },
    { img: 'assets/produtos/iphone16promax.jpg', preco: '1371.00€', nome: 'Iphone 16 Pro Max' },
    { img: 'assets/produtos/s23ultra.jpg', preco: '618.00€', nome: 'Samsung Galaxy S23 Ultra' },
    { img: 'assets/produtos/redmi14proplus.jpg', preco: '529,99€', nome: 'Xiaomi Redmi Note 14 Pro+ 5G' },
    { img: 'assets/produtos/iphone16.jpg', preco: '889,99€', nome: 'Iphone 16' },
    { img: 'assets/produtos/nokia3110.jpg', preco: '∞€', nome: 'Nokia 3110' }
  ];

  constructor(private router: Router) {}

  voltar() {
    this.router.navigate(['/tabs/menu']); // Ou para a rota correta
  }
}
