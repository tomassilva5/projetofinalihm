import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product.interface';

@Component({
  selector: 'app-telemoveis',
  templateUrl: './telemoveis.page.html',
  styleUrls: ['./telemoveis.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class TelemoveisPage implements OnInit {
  products: Product[] = [];
  pesquisaAberta = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  voltar() {
    this.router.navigate(['/tabs/menu']);
  }

  abrirPesquisa() {
    this.pesquisaAberta = true;
  }

  fecharPesquisa() {
    this.pesquisaAberta = false;
  }
}
