import { Component } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class MenuPage {
  activeTab: 'produtos' | 'servicos' = 'servicos';

  produtos = [
    'Telemóveis',
    'Eletrodomésticos',
    'Smartwatches',
    'Tv',
    'Som',
    'Gaming',
    'Fotografia',
    'Drones',
    'Desktops',
    'Monitores',
    'Portáteis',
    'Acessórios de Telemóvel',
    'Projeção de imagem'
  ];

  servicos = [
    'Serviços para Casa',
    'Reparações e Manutenções',
    'Instalações e Configurações',
    'Suporte Técnico Online',
    'Devoluções'
  ];
}
