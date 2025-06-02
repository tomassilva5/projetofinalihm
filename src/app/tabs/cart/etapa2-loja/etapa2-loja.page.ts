import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { 
  IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonInput
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-etapa2-loja',
  templateUrl: './etapa2-loja.page.html',
  styleUrls: ['./etapa2-loja.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonInput,
    CommonModule, FormsModule
  ]
})
export class Etapa2LojaPage implements OnInit {
  searchText = '';
  selectedCity = '';
  total = 0;

  cities = [
    { name: 'Lisboa', address: 'Rua Augusta, 100 - Centro Histórico', region: 'Grande Lisboa' },
    { name: 'Porto', address: 'Rua de Santa Catarina, 200 - Centro', region: 'Grande Porto' },
    { name: 'Coimbra', address: 'Largo da Portagem, 15 - Centro', region: 'Centro' },
    { name: 'Braga', address: 'Avenida da Liberdade, 50 - Centro', region: 'Norte' },
    { name: 'Faro', address: 'Rua Dr. Francisco Gomes, 30 - Centro', region: 'Algarve' },
    { name: 'Funchal', address: 'Avenida Arriaga, 80 - Centro', region: 'Madeira' },
    { name: 'Aveiro', address: 'Rua Dr. Lourenço Peixinho, 25 - Centro', region: 'Centro' },
    { name: 'Cascais', address: 'Rua Frederico Arouca, 10 - Centro', region: 'Grande Lisboa' },
    { name: 'Sintra', address: 'Praça da República, 5 - Centro Histórico', region: 'Grande Lisboa' },
    { name: 'Setúbal', address: 'Avenida Luísa Todi, 150 - Centro', region: 'Grande Lisboa' },
    { name: 'Vila Nova de Gaia', address: 'Rua Dr. Sousa Viterbo, 40 - Centro', region: 'Grande Porto' },
    { name: 'Guimarães', address: 'Largo do Toural, 20 - Centro Histórico', region: 'Norte' },
    { name: 'Viseu', address: 'Rua Direita, 60 - Centro', region: 'Centro' },
    { name: 'Évora', address: 'Praça do Giraldo, 8 - Centro Histórico', region: 'Alentejo' },
    { name: 'Viana do Castelo', address: 'Praça da República, 12 - Centro', region: 'Norte' }
  ];

  filteredCities = [...this.cities];

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // Atualiza o total do carrinho
    this.cartService.cart$.subscribe(cart => {
      this.total = cart?.reduce((acc, item) =>
        acc + (Number(item.price) * Number(item.quantity)), 0) || 0;
    });

    // Recupera cidade escolhida anteriormente, se existir
    const saved = localStorage.getItem('lojaEscolhida');
    if (saved) this.selectedCity = saved;
  }

  goBack() {
    this.router.navigate(['/tabs/cart/etapa1']);
  }

  filterCities() {
    const txt = this.searchText.trim().toLowerCase();
    this.filteredCities = txt
      ? this.cities.filter(city =>
          city.name.toLowerCase().includes(txt) ||
          city.region.toLowerCase().includes(txt)
        )
      : [...this.cities];
  }

  selectCity(city: any) {
    this.selectedCity = city.name;
  }

  continuar() {
    if (!this.selectedCity) {
      alert('Selecione uma loja para continuar');
      return;
    }
    localStorage.setItem('lojaEscolhida', this.selectedCity);
    localStorage.setItem('tipoEntrega', 'store');
    this.router.navigate(['/tabs/cart/etapa3']);
  }
}
