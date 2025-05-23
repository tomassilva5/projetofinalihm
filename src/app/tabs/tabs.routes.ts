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
]; 