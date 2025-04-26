import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CONSTANTS } from 'src/app/constants/constants';
import { LoginComponent } from 'src/app/pages/components/login/login.component';
import { environment } from 'src/environments/environment';
import { SwiperOptions } from 'swiper/types';
import { MatDialogService } from '../../services/mat-dialog.service';
import { WebService } from '../../services/web.service';
import { GlobalVariable } from '../../utilities/global-veriables';
import { SwiperDirective } from '../../utilities/swiper.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    RouterLinkActive,
    LoginComponent,
    MatDialogModule,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    SwiperDirective,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Input() isBannerPresent = false;

  isMenuVisible: boolean = false;
  isVerticalScroll: boolean = false;
  assetPath = `${environment.assestsBasePath}images/Header`;
  bannerConfig: SwiperOptions = CONSTANTS.bannerConfig;
  itemsToDisplayInProducts = CONSTANTS.productItems;
  globalVeriable = GlobalVariable;
  isProductMenuVisiable: boolean = false;

  constructor(
    private router: Router,
    private webService: WebService,
    private matDialogService: MatDialogService
  ) {}

  ngOnInit(): void {
    if (window.scrollY > 0) {
      this.isVerticalScroll = true;
    } else {
      this.isVerticalScroll = false;
    }
    window.onscroll = () => {
      if (window.scrollY > 0) {
        this.isVerticalScroll = true;
      } else {
        this.isVerticalScroll = false;
      }
    };
  }

  get isUserLoggedIn(): boolean {
    return this.webService.isUserAuthenticated;
  }

  onMenuBtnClick() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  selectNavOptions(headerName: string) {
    GlobalVariable.selectedPage = headerName?.trim();
    this.isMenuVisible = false;
  }

  onLoginBtnClick() {
    if (!this.isUserLoggedIn) {
      this.matDialogService
        .openDialog(
          {
            width: 'auto',
            maxWidth: 'auto',
          },
          LoginComponent
        )
        .afterClosed()
        .subscribe((data) => {
          if (data && !data.hasError) {
            this.router.navigate(['admin/queries']);
          }
        });
    }
  }

  get getUserName(): string {
    return this.webService.getUserName;
  }

  logout() {
    this.webService.removeAuthentication();
    this.router.navigate(['pages/home']);
  }

  navigateToQuery(): void {
    this.router.navigate(['admin/queries']);
  }

  openProductMenu(): void {
    this.isProductMenuVisiable = true;
  }
}
