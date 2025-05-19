import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then(m => m.SplashPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'registar',
    loadComponent: () => import('./registar/registar.page').then(m => m.RegistarPage)
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'home', loadComponent: () => import('./tabs/home/home.page').then(m => m.HomePage) },
      { path: 'menu', loadComponent: () => import('./tabs/menu/menu.page').then(m => m.MenuPage) },
      { path: 'cart', loadComponent: () => import('./tabs/cart/cart.page').then(m => m.CartPage) },
      { path: 'profile', loadComponent: () => import('./tabs/profile/profile.page').then(m => m.ProfilePage) },
      { path: '', redirectTo: '/tabs/home', pathMatch: 'full' }
    ]
  }
];
