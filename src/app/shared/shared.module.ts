import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './components/banner/banner.component';
import { ContactFooterComponent } from './components/contact-footer/contact-footer.component';
import { DiaplayImagesComponent } from './components/diaplay-images/diaplay-images.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MagnifyComponent } from './components/magnify/magnify.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { MatTableResponsiveModule } from './utilities/mat-table-responsive/mat-table-responsive.module';
import { SwiperDirective } from './utilities/swiper.directive';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    SwiperDirective,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    DiaplayImagesComponent,
    MagnifyComponent,
    BannerComponent,
    ContactFooterComponent,
    UploadFilesComponent,
    MatTableResponsiveModule,
    MatSelectModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    MagnifyComponent,
    BannerComponent,
    UploadFilesComponent,
    ContactFooterComponent,
    CommonModule,
    SwiperDirective,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatStepperModule,
    RouterModule,
    HttpClientModule,
    MatCardModule,
    MatSelectModule,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    MatTableResponsiveModule,
  ],
})
export class SharedModule {}
