import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageDiaplyModel } from 'src/app/models/image-display-model';
import { SwiperOptions } from 'swiper/types';
import { SwiperDirective } from '../../utilities/swiper.directive';

@Component({
  selector: 'app-diaplay-images',
  standalone: true,
  templateUrl: './diaplay-images.component.html',
  imports: [SwiperDirective],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DiaplayImagesComponent implements OnInit {
  diaplayConfig!: SwiperOptions;
  imagesToDisplay!: Array<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ImageDiaplyModel) {}

  vehicleConfig: SwiperOptions = {
    autoHeight: false,
    navigation: true,
    pagination: false,
    centeredSlidesBounds: true,
    centeredSlides: true,
    initialSlide: 2,
    slidesPerView: 1,
    spaceBetween: 20,
    direction: 'horizontal',
    loop: true,
    grabCursor: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
    },
  };

  ngOnInit(): void {
    this.diaplayConfig = this.data.diaplayConfig ?? this.vehicleConfig;
    this.imagesToDisplay = Array(2).fill(this.data.imagesToDisplay).flat();
  }

  get screenWidth(): number {
    return window.screen.width;
  }
}
