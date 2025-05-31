import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service'; // Confirma o caminho
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonButton, 
  IonIcon,
  IonInput
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-etapa2-loja',
  templateUrl: './etapa2-loja.page.html',
  styleUrls: ['./etapa2-loja.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonButton, 
    IonIcon,
    IonInput,
    CommonModule, 
    FormsModule
  ]
})
export class Etapa2LojaPage implements OnInit {
  searchText: string = '';
  selectedCity: string = '';
  total: number = 0; // Inicializa o total como 0
  
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
    private cartService: CartService // Injecção do CartService
  ) { }

  ngOnInit() {
    // Busca o valor total do carrinho
    this.cartService.cart$.subscribe(cart => {
      if (cart && cart.length > 0) {
        // Calcula o total somando o preço * quantidade de cada item
        // Garante que price e quantity são números válidos
        this.total = cart.reduce((acc, item) => {
          const price = typeof item.price === 'number' ? item.price : 0;
          const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
          return acc + (price * quantity);
        }, 0);
      } else {
        this.total = 0; // Carrinho vazio, total é 0
      }
    });

    // Carrega cidade salva se existir
    const cidadeSalva = localStorage.getItem('lojaEscolhida');
    if (cidadeSalva) {
      this.selectedCity = cidadeSalva;
    }
  }

  goBack() {
    this.router.navigate(['/tabs/cart/etapa1']);
  }

  filterCities() {
    if (this.searchText.trim() === '') {
      this.filteredCities = [...this.cities];
    } else {
      this.filteredCities = this.cities.filter(city => 
        city.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        city.region.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  selectCity(city: any) {
    this.selectedCity = city.name;
  }

  continuar() {
    if (this.selectedCity) {
      localStorage.setItem('lojaEscolhida', this.selectedCity);
      localStorage.setItem('tipoEntrega', 'store');
      this.router.navigate(['/tabs/cart/etapa3']);
    } else {
      alert('Selecione uma loja para continuar');
    }
  }
}
