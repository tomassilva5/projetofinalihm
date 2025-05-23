import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product.interface';
import { Location } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class ProductDetailsPage implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private location: Location,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe((prod: Product | undefined) => {
      this.product = prod;
    });
  }

  voltar() {
    this.location.back();
  }

  async adicionarAoCarrinho() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      const toast = await this.toastController.create({
        message: `${this.product.name} adicionado ao carrinho!`,
        duration: 2000,
        position: 'bottom',
        cssClass: 'custom-toast',
        buttons: [
          {
            text: 'Ver Carrinho',
            role: 'info',
            handler: () => {
              this.router.navigate(['/tabs/cart']);
            }
          }
        ]
      });

      await toast.present();
    }
  }
} 