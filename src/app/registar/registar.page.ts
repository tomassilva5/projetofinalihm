import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-registar',
  templateUrl: './registar.page.html',
  styleUrls: ['./registar.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonInput, IonButton, IonItem,
    CommonModule, FormsModule
  ]
})
export class RegistarPage {
  nome = '';
  email = '';
  telefone = '';
  password = '';

  onSubmit() {
    alert(`Nome: ${this.nome}\nEmail: ${this.email}\nTelefone: ${this.telefone}`);
  }

  voltar() {
    window.history.back();
  }
}
