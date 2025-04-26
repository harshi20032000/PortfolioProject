import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CONSTANTS } from 'src/app/constants/constants';
import { environment } from 'src/environments/environment';
import { SwiperOptions } from 'swiper/types';
import { SwiperDirective } from '../../utilities/swiper.directive';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [SwiperDirective, CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BannerComponent {
  @Input() bannerImages!: Array<any>;

  assetPath = `${environment.assestsBasePath}images/Header`;
  bannerConfig: SwiperOptions = CONSTANTS.bannerConfig;
}
