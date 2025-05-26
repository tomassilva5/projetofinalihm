import { Component, OnInit } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone'; // <-- IonIcon importado!
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon] // <-- IonIcon aqui!
})
export class MenuPage implements OnInit {
  activeTab: 'produtos' | 'servicos' = 'produtos';

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'servicos') {
        this.activeTab = 'servicos';
      }
    });
  }

  abrirCategoria(item: string) {
    if (item === 'Telemóveis') {
      this.router.navigate(['/tabs/menu/telemoveis']);
    } else {
      this.router.navigate(['/working-on-it']);
    }
  }
}
