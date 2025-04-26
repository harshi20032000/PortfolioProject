import { Routes } from '@angular/router';
import { getAllProductsResolver } from '../resolvers/all-products.resolver';
import { getQueryResolver } from '../resolvers/get-query.resolver';
import { productSpecResolver } from '../resolvers/product-spec.resolver';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProductActionComponent } from './components/product-action/product-action.component';
import { QueryViewComponent } from './components/query-view/query-view.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'queries',
    component: QueryViewComponent,
    resolve: {
      queryData: getQueryResolver,
    },
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    resolve: {
      productDetails: getAllProductsResolver,
    },
  },
  {
    path: 'edit-product/:id',
    component: ProductActionComponent,
    resolve: {
      productDetails: productSpecResolver,
    },
  },
  {
    path: 'add-product',
    component: ProductActionComponent,
  },
];
