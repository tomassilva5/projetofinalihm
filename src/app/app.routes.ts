import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then((m) => m.SplashPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'registar',
    loadComponent: () => import('./registar/registar.page').then((m) => m.RegistarPage),
  },
  {
    path: 'notificacoes',
    loadComponent: () => import('./notificacoes/notificacoes.page').then((m) => m.NotificacoesPage),
  },
  {
    path: 'working-on-it',
    loadComponent: () => import('./funcionalidade_adicionais/working-on-it.page').then((m) => m.WorkingOnItPage),
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./tabs/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'menu',
        children: [
          {
            path: '',
            loadComponent: () => import('./tabs/menu/menu.page').then((m) => m.MenuPage),
          },
          {
            path: 'telemoveis',
            loadComponent: () => import('./tabs/menu/telemoveis/telemoveis.page').then((m) => m.TelemoveisPage),
          },
          {
            path: 'product/:id',
            loadComponent: () => import('./tabs/menu/product-details/product-details.page').then(m => m.ProductDetailsPage)
          },
        ]
      },
      {
        path: 'cart',
        loadComponent: () => import('./tabs/cart/cart.page').then((m) => m.CartPage),
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadComponent: () => import('./tabs/profile/profile.page').then((m) => m.ProfilePage),
          },
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'splash',
  }
];
