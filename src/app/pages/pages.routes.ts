import { Routes } from '@angular/router';
import { getConfigResolver } from '../resolvers/get-config.resolver';
import { homeDetailsResolver } from '../resolvers/home-details.resolver';
import { productSpecResolver } from '../resolvers/product-spec.resolver';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ReviewComponent } from './components/review/review.component';
import { ServicesComponent } from './components/services/services.component';

export const PAGES_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'about',
    component: AboutUsComponent,
    resolve: {
      banners: getConfigResolver,
    },
  },
  {
    path: 'home',
    component: HomePageComponent,
    resolve: {
      productDetails: homeDetailsResolver,
      banners: getConfigResolver,
    },
  },
  {
    path: 'reviews',
    component: ReviewComponent,
    resolve: {
      reviewDetails: homeDetailsResolver,
      banners: getConfigResolver,
    },
  },
  {
    path: 'services',
    component: ServicesComponent,
    resolve: {
      banners: getConfigResolver,
    },
  },
  {
    path: 'products/:id',
    component: AllProductsComponent,
    resolve: {
      productDetails: homeDetailsResolver,
      banners: getConfigResolver,
    },
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    resolve: {
      productDetails: productSpecResolver,
    },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
    resolve: {
      banners: getConfigResolver,
    },
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
