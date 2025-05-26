import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/interfaces/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class HomePage implements OnInit {
  featuredProducts: Product[] = [];
  recentProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    // Carregar produtos em destaque (com desconto)
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products;
    });

    // Carregar produtos recentes (últimos 3)
    this.productService.getProducts().subscribe(products => {
      this.recentProducts = products.slice(0, 3);
    });
  }

  produtos = [
    { img: 'assets/icon/produtos/xiaomi 15 ultra.png', preco: '1424,98€', nome: 'Xiaomi 15 Ultra' },
    { img: 'assets/icon/produtos/iphone 16 pro max.png', preco: '1371.00€', nome: 'Iphone 16 Pro Max' },
    { img: 'assets/icon/produtos/asusvivobook.png', preco: '899,99€', nome: 'ASUS Vivobook' },
    { img: 'assets/icon/produtos/LG tv.png', preco: '17.360,00€', nome: 'Smart Tv LG' },
    { img: 'assets/icon/produtos/Samsung tv.png', preco: '5164,33€', nome: 'Tv Samsung' },
    { img: 'assets/icon/produtos/ps5 pro.png', preco: '799,99€', nome: 'PS5 Pro' }
  ];

  irParaServicos() {
    this.router.navigate(['/tabs/menu'], {
      queryParams: { tab: 'servicos' }
    });
  }

  animarLogo(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    el.classList.remove('logo-anim');
    void el.offsetWidth;
    el.classList.add('logo-anim');
  }

  navigateToWorkingOnIt() {
    this.router.navigate(['/funcionalidades-adicionais/working-on-it']);
  }
}
