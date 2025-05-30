import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from 'src/app/core/interfaces/product.interface';
import { ProductService } from 'src/app/core/services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-devolucoes',
  templateUrl: './devolucoes.page.html',
  styleUrls: ['./devolucoes.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class DevolucoesPage implements OnInit {
  recentProducts: Product[] = [];
  selectedProduct: Product | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.recentProducts = products.slice(0, 3); // últimos 3 produtos
    });
  }

  selectProduct(prod: Product) {
    this.selectedProduct = prod;
  }

  seguirParaDevolucao() {
    if (this.selectedProduct) {
      this.router.navigate(['/tabs/menu/devolucoes', this.selectedProduct.id]);
    }
  }

  voltar() {
    this.location.back();
  }
} 