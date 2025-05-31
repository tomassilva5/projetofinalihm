import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page'; // Confirma que o caminho para TabsPage está correto

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash', // Rota inicial
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
    path: 'working-on-it',
    loadComponent: () => import('./funcionalidade_adicionais/working-on-it.page').then((m) => m.WorkingOnItPage),
  },
  {
    path: 'tabs',
    component: TabsPage, // O componente TabsPage é carregado aqui
    children: [         // As suas rotas filhas (tabs e páginas internas) são definidas aqui
      {
        path: 'home',
        // O caminho para home.page deve ser relativo a app.routes.ts
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
          {
            path: 'devolucoes',
            children: [
              {
                path: '',
                loadComponent: () => import('./tabs/menu/devolucoes/devolucoes.page').then(m => m.DevolucoesPage)
              },
              {
                path: 'sucesso',
                loadComponent: () => import('./tabs/menu/devolucoes/sucesso/sucesso.page').then(m => m.SucessoPage)
              },
              {
                path: ':id',
                loadComponent: () => import('./tabs/menu/devolucoes/devolucao-detalhe/devolucao-detalhe.page').then(m => m.DevolucaoDetalhePage)
              }
            ]
          },
        ]
      },
      {
        path: 'cart',
        children: [
          {
            path: '',
            loadComponent: () => import('./tabs/cart/cart.page').then((m) => m.CartPage),
          },
          {
            path: 'etapa1',
            loadComponent: () => import('./tabs/cart/etapa1/etapa1.page').then(m => m.Etapa1Page)
          },
          {
            path: 'etapa2',
            loadComponent: () => import('./tabs/cart/etapa2/etapa2.page').then(m => m.Etapa2Page)
          },
          {
            path: 'etapa2-loja', // A rota que está a falhar
            loadComponent: () => import('./tabs/cart/etapa2-loja/etapa2-loja.page').then(m => m.Etapa2LojaPage)
          },
          {
            path: 'etapa3',
            loadComponent: () => import('./tabs/cart/etapa3/etapa3.page').then(m => m.Etapa3Page)
          },
          {
            path: 'etapa4',
            loadComponent: () => import('./tabs/cart/etapa4/etapa4.page').then(m => m.Etapa4Page)
          },
          {
            path: 'sucesso',
            loadComponent: () => import('./tabs/cart/sucesso/sucesso.page').then(m => m.SucessoPage)
          }
        ]
      },
      {
        path: 'profile',
        children: [ // Mantendo a estrutura de children para profile conforme o teu exemplo
          {
            path: '',
            loadComponent: () => import('./tabs/profile/profile.page').then((m) => m.ProfilePage),
          },
          {
            path: 'notificacoes',
            // O caminho para notificacoes.page deve ser relativo a app.routes.ts
            // Se notificacoes.page está em src/app/notificacoes/
            loadComponent: () => import('./notificacoes/notificacoes.page').then(m => m.NotificacoesPage)
            // Se notificacoes.page está em src/app/tabs/profile/notificacoes/
            // loadComponent: () => import('./tabs/profile/notificacoes/notificacoes.page').then(m => m.NotificacoesPage)
          }
        ]
      },
      {
        path: '', // Redirecionamento padrão dentro de /tabs para /tabs/home
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  { // Wildcard route para apanhar URLs não definidas e redirecionar
    path: '**',
    redirectTo: 'splash', // ou para uma página 404
    pathMatch: 'full'
  }
];
