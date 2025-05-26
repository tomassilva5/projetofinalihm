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

  navigateToCart() {
    this.router.navigate(['/tabs/cart']);
  }
}
