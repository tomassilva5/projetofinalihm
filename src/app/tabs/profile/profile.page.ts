import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, IonTabBar, IonTabButton, IonLabel, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonTabBar, IonTabButton, IonLabel, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton]
})
export class ProfilePage implements OnInit {
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

  userName: string = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.userName = localStorage.getItem('userName') || 'Utilizador';
  }

  abrirNotificacoes() {
    this.router.navigate(['notificacoes']);
  }

  navigateToWorkingOnIt() {
    this.router.navigate(['working-on-it']);
  }

  handleOptionClick(option: string) {
    if (option === 'Notificações') {
      this.abrirNotificacoes();
    } else {
      this.navigateToWorkingOnIt();
    }
  }
}
