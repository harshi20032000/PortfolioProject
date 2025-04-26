import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { SwiperOptions } from 'swiper/types';

@Directive({
  selector: '[fmSwiper]',
  standalone: true,
})
export class SwiperDirective implements AfterViewInit {
  @Input('config') config?: SwiperOptions;

  private readonly swiperElement: HTMLElement;

  constructor(
    private el: ElementRef<HTMLElement & { initialize: () => void }>
  ) {
    this.swiperElement = el.nativeElement;
  }

  ngAfterViewInit(): void {
    Object.assign(this.el.nativeElement, this.config);
    this.el.nativeElement.initialize();
  }
}
