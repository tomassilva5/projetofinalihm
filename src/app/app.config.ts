import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ProductService } from './core/services/product.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ProductService
  ]
}; 