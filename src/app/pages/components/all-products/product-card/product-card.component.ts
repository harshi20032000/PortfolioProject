import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from 'src/app/constants/constants';
import { MagnifyService } from 'src/app/shared/services/magnify.service';
import { SwiperDirective } from 'src/app/shared/utilities/swiper.directive';
import { environment } from 'src/environments/environment';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [SwiperDirective, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCardComponent implements OnInit {
  @Input() content: any;
  @Output() checkProductEvent = new EventEmitter();
  @ViewChild('productSwiper') productSwiper: any;

  assetPath = `${environment.assestsBasePath}images/Product Page`;
  productConfig: SwiperOptions = CONSTANTS.productConfig;
  currentProductImage!: string;
  selectedColor!: string;
  images!: Array<any>;


  constructor(private magnifyService: MagnifyService) {}

  ngOnInit(): void {
    this.currentProductImage = this.content.productPictureDetails[0].productImageURL;

    if (this.content.colorOptions) {
      this.selectedColor = this.colorOption(0);
    }
  }

  checkProduct(index: number) {
    this.checkProductEvent.emit(index);
  }

  magnifyCard() {
    const currentIndex = this.productSwiper.nativeElement.swiper.activeIndex;
    this.currentProductImage = this.content.productPictureDetails[currentIndex].productImageURL

    this.magnifyService.showMagnify(this.currentProductImage);
  }

  closeMagnifiedView() {
    const magnifiedView = document.getElementById('magnified-view');
    if (magnifiedView) magnifiedView.style.display = 'none';
  }

  changeSelectedColor(color: any) {
    this.selectedColor = color;
  }

  get getImagesByColor(): Array<any> {
    return this.content.productPictureDetails.filter((eachPic: any) => eachPic.productColor === this.selectedColor);
  }

  colorOption(index: number): string {
    return this.content.colorOptions.split(',')[index];
  }

}
