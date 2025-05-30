import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'menu',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./menu/menu.page').then((m) => m.MenuPage),
          },
          {
            path: 'product/:id',
            loadComponent: () => import('./menu/product-details/product-details.page').then(m => m.ProductDetailsPage)
          },
          {
            path: 'devolucoes',
            loadComponent: () => import('./menu/devolucoes/devolucoes.page').then(m => m.DevolucoesPage)
          }

        ]
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./cart/cart.page').then((m) => m.CartPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'etapa1',
    loadComponent: () => import('./cart/etapa1/etapa1.page').then( m => m.Etapa1Page)
  },
  {
    path: 'etapa2',
    loadComponent: () => import('./cart/etapa2/etapa2.page').then( m => m.Etapa2Page)
  },
  {
    path: 'etapa3',
    loadComponent: () => import('./cart/etapa3/etapa3.page').then( m => m.Etapa3Page)
  },
  {
    path: 'etapa4',
    loadComponent: () => import('./cart/etapa4/etapa4.page').then( m => m.Etapa4Page)
  },  {
    path: 'sucesso',
    loadComponent: () => import('./cart/sucesso/sucesso.page').then( m => m.SucessoPage)
  },
  {
    path: 'etapa2-loja',
    loadComponent: () => import('./cart/etapa2-loja/etapa2-loja.page').then( m => m.Etapa2LojaPage)
  },


];
