import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, IonTabBar, IonTabButton, IonLabel } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonTabBar, IonTabButton, IonLabel]
})
export class ProfilePage {
  profileOptions = [
    'Ver conta',
    'As minhas Compras',
    'Os meus Serviços',
    'Dados Pessoais',
    'Contas associadas',
    'Gestão de Moradas',
    'Notificações',
    'Preferencias de Comunicação',
    'Gestão de Cookies'
  ];

  constructor(private router: Router) {}

  abrirNotificacoes() {
    this.router.navigate(['/tabs/profile/notificacoes']);
  }
}
