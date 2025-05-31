import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, IonTabBar, IonTabButton, IonLabel, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service'; // Importa o CartService se precisar limpar o carrinho

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
    'Gestão de Cookies',
    'Terminar Sessão' // ✅ Opção adicionada
  ];

  userName: string = '';

  constructor(
    private router: Router,
    private cartService: CartService // Injecção do CartService
    ) {
  }

  ngOnInit() {
    this.userName = localStorage.getItem('userName') || 'Utilizador';
  }

  abrirNotificacoes() {
    // A rota para notificações deve ser global ou relativa à raiz das tabs
    // Se 'notificacoes' está em app.routes.ts como rota global:
    this.router.navigate(['/notificacoes']);
    // Se 'notificacoes' é uma child de 'profile' dentro das tabs:
    // this.router.navigate(['/tabs/profile/notificacoes']);
  }

  navigateToWorkingOnIt() {
    this.router.navigate(['/working-on-it']);
  }

  logout() {
    // Limpar dados do utilizador do localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('userToken'); // Exemplo se tiveres um token
    // Adiciona aqui outros itens do localStorage relacionados à sessão do utilizador

    // Limpar o carrinho de compras
    this.cartService.clearCart(); // Assume que tens este método no CartService

    // Redirecionar para a página de login
    // replaceUrl: true para que o utilizador não possa voltar para a página de perfil com o botão "back" do browser
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  handleOptionClick(option: string) {
    if (option === 'Notificações') {
      this.abrirNotificacoes();
    } else if (option === 'Terminar Sessão') { // ✅ Trata a opção de terminar sessão
      this.logout();
    } else {
      this.navigateToWorkingOnIt();
    }
  }
}
