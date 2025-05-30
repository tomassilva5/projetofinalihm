import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucesso',
  templateUrl: './sucesso.page.html',
  styleUrls: ['./sucesso.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class SucessoPage {
  constructor(private router: Router) {}
  voltar() {
    this.router.navigate(['/tabs/home']);
  }
} 