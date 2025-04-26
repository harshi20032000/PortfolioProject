import { Routes } from '@angular/router';

export const APP_ROUTES_CONFIG: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pages',
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.routes').then((x) => x.PAGES_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((x) => x.ADMIN_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'pages',
  },
];
