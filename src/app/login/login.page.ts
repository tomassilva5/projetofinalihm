import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonItem, IonText, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, IonButton, IonItem, IonText, IonIcon, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  emailOuTelefone = '';
  password = '';
  showPassword = false; // Variável para controlar a visibilidade da passe

  constructor(private router: Router, private navCtrl: NavController) { }

  

  ngOnInit() {
  }

  onSubmit() {
    if (this.emailOuTelefone && this.password) {
      this.navCtrl.navigateRoot('/tabs/home');
    }
  }

  esqueciSenha() {
    alert('Funcionalidade de recuperação de senha a implementar');
  }

  irParaRegistar() {
    this.router.navigate(['/registar']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Alterna entre mostrar e ocultar 
  }
}