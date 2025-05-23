import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product.interface';
import { IonPopover } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-telemoveis',
  templateUrl: './telemoveis.page.html',
  styleUrls: ['./telemoveis.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule]
})
export class TelemoveisPage implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  pesquisaAberta = false;
  selectedOrder = 'relevancia';
  ordenarMenuAberto = false;
  filtroMenuAberto = false;
  marcasDisponiveis: string[] = [];
  filtroMarcas: string[] = [];
  filtroPrecoMin: number | null = null;
  filtroPrecoMax: number | null = null;
  filtroAvaliacao: number | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = [...products];
      this.marcasDisponiveis = [...new Set(products.map(p => p.brand))];
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

  abrirOrdenar(ev: Event) {
    const popover = document.getElementById('ordenar-popover');
    const backdrop = document.getElementById('ordenar-backdrop');
    if (popover && backdrop) {
      popover.style.display = 'block';
      backdrop.style.display = 'block';
      this.ordenarMenuAberto = true;
    }
  }

  fecharOrdenar() {
    const popover = document.getElementById('ordenar-popover');
    const backdrop = document.getElementById('ordenar-backdrop');
    if (popover && backdrop) {
      popover.style.display = 'none';
      backdrop.style.display = 'none';
      this.ordenarMenuAberto = false;
    }
  }

  toggleOrdenar(ev: Event) {
    const popover = document.getElementById('ordenar-popover');
    const backdrop = document.getElementById('ordenar-backdrop');
    if (popover && backdrop) {
      const isOpen = popover.style.display === 'block';
      if (isOpen) {
        this.fecharOrdenar();
      } else {
        this.abrirOrdenar(ev);
      }
    }
  }

  ordenarProdutos(tipo: string) {
    this.selectedOrder = tipo;
    let produtos = [...this.products];
    switch (tipo) {
      case 'preco-asc':
        produtos.sort((a, b) => a.price - b.price);
        break;
      case 'preco-desc':
        produtos.sort((a, b) => b.price - a.price);
        break;
      case 'melhor-avaliacao':
        produtos.sort((a, b) => (b.reviews?.reduce((acc, r) => acc + r.rating, 0) / (b.reviews?.length || 1)) - (a.reviews?.reduce((acc, r) => acc + r.rating, 0) / (a.reviews?.length || 1)));
        break;
      case 'mais-vendidos':
        // Não implementado porque não existe o campo 'sold'
        break;
      case 'melhor-desconto':
        produtos.sort((a, b) => (((b.oldPrice || b.price) - b.price) / (b.oldPrice || b.price)) - (((a.oldPrice || a.price) - a.price) / (a.oldPrice || a.price)));
        break;
      default:
        // Relevância (ordem original)
        produtos = [...this.products];
    }
    this.filteredProducts = produtos;
    this.fecharOrdenar();
  }

  abrirFiltro(ev: Event) {
    const popover = document.getElementById('filtro-popover');
    const backdrop = document.getElementById('filtro-backdrop');
    if (popover && backdrop) {
      popover.style.display = 'block';
      backdrop.style.display = 'block';
      this.filtroMenuAberto = true;
    }
  }

  fecharFiltro() {
    const popover = document.getElementById('filtro-popover');
    const backdrop = document.getElementById('filtro-backdrop');
    if (popover && backdrop) {
      popover.style.display = 'none';
      backdrop.style.display = 'none';
      this.filtroMenuAberto = false;
    }
  }

  toggleFiltro(ev: Event) {
    const popover = document.getElementById('filtro-popover');
    const backdrop = document.getElementById('filtro-backdrop');
    if (popover && backdrop) {
      const isOpen = popover.style.display === 'block';
      if (isOpen) {
        this.fecharFiltro();
      } else {
        this.abrirFiltro(ev);
      }
    }
  }

  toggleMarca(marca: string) {
    if (this.filtroMarcas.includes(marca)) {
      this.filtroMarcas = this.filtroMarcas.filter(m => m !== marca);
    } else {
      this.filtroMarcas.push(marca);
    }
  }

  setPrecoRapido(min: number, max: number | null) {
    this.filtroPrecoMin = min;
    this.filtroPrecoMax = max;
  }

  aplicarFiltro() {
    this.filteredProducts = this.products.filter(p => {
      const marcaOk = this.filtroMarcas.length === 0 || this.filtroMarcas.includes(p.brand);
      const precoOk = (this.filtroPrecoMin == null || p.price >= this.filtroPrecoMin) &&
                      (this.filtroPrecoMax == null || p.price <= this.filtroPrecoMax);
      const avaliacaoOk = this.filtroAvaliacao == null ||
        ((p.reviews?.reduce((acc, r) => acc + r.rating, 0) / (p.reviews?.length || 1)) >= this.filtroAvaliacao);
      return marcaOk && precoOk && avaliacaoOk;
    });
    this.fecharFiltro();
  }

  limparFiltro() {
    this.filtroMarcas = [];
    this.filtroPrecoMin = null;
    this.filtroPrecoMax = null;
    this.filtroAvaliacao = null;
    this.filteredProducts = [...this.products];
    this.fecharFiltro();
  }
}
