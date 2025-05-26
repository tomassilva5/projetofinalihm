import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-working-on-it',
  templateUrl: './working-on-it.page.html',
  styleUrls: ['./working-on-it.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class WorkingOnItPage {
  message: string = 'Ainda estamos a trabalhar nesta funcionalidade. Por favor, volte mais tarde!';

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
} 