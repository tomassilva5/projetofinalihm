import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.page.html',
  styleUrls: ['./notificacoes.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class NotificacoesPage {
  constructor(private router: Router) {}
  voltar() {
    this.router.navigate(['/tabs/profile']);
  }
}
