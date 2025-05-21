import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  // ... outras rotas splash/login/etc
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'home', loadComponent: () => import('./tabs/home/home.page').then(m => m.HomePage) },
      {
        path: 'menu',
        children: [
          { path: '', loadComponent: () => import('./tabs/menu/menu.page').then(m => m.MenuPage) },
          { path: 'telemoveis', loadComponent: () => import('./telemoveis/telemoveis.page').then(m => m.TelemoveisPage) }
        ]
      },
      { path: 'cart', loadComponent: () => import('./tabs/cart/cart.page').then(m => m.CartPage) },
      { path: 'profile', loadComponent: () => import('./tabs/profile/profile.page').then(m => m.ProfilePage) },
      { path: '', redirectTo: '/tabs/home', pathMatch: 'full' }
    ]
  },
  {
    path: '**',
    redirectTo: 'splash'
  }
];
