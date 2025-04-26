import { HttpClient } from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CONSTANTS } from 'src/app/constants/constants';
import { DialogData } from 'src/app/models/dialog-data';
import { MatDialogService } from 'src/app/shared/services/mat-dialog.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { GlobalVariable } from 'src/app/shared/utilities/global-veriables';
import { environment } from 'src/environments/environment';
import { SwiperOptions } from 'swiper/types';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent implements OnInit {
  facebookID = CONSTANTS.facebookID;
  instagramID = CONSTANTS.instagramID;
  vehicleConfig: SwiperOptions = {
    autoHeight: false,
    pagination: {
      clickable: true,
      dynamicBullets: false,
    },
    speed: 1000,
    spaceBetween: 24,
    slidesPerView: 3,
    slidesPerGroup: 1,
    direction: 'horizontal',
    loop: false,
    grabCursor: true,
    navigation: {
      nextEl: '#product-button-next',
      prevEl: '#product-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 1,
      },
      991: {
        slidesPerView: 3,
        slidesPerGroup: 1,
      },
    },
  };
  testimonialConfig: SwiperOptions = {
    slidesPerView: 1,
    slidesPerGroup: 1,
    speed: 1000,
    direction: 'horizontal',
    grabCursor: true,
    navigation: {
      nextEl: '#testimonial-right-button',
      prevEl: '#testimonial-left-button',
    },
  };
  salesDepartmentNum1 = CONSTANTS.salesDepartmentNumber1;
  salesDepartmentNum2 = CONSTANTS.salesDepartmentNumber2;
  officeLocation = CONSTANTS.officeLocation;
  queryForm = new FormGroup({
    queryName: new FormControl('', Validators.required),
    queryEmail: new FormControl('', [Validators.required, Validators.email]),
    queryPhone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/),
    ]),
    queryMessage: new FormControl(''),
  });
  assetPath = `${environment.assestsBasePath}images/Homepage`;
  currentIndex = 0;
  aboutUsConstant = CONSTANTS.ABOUT_US;
  bannerImages!: Array<any>;
  productDetails: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private dialogService: MatDialogService
  ) {}

  ngOnInit(): void {
    if (window.screen.width <= 500) this.vehicleConfig.navigation = false;
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.bannerImages =
      this.activatedRoute.snapshot.data['banners']?.responsePayload;
    GlobalVariable.selectedPage = 'home';
  }

  sendQuery() {
    if (this.queryForm.valid) {
      const payload = {
        queryID: uuidv4(),
        queryPhone: '' + this.queryForm.value.queryPhone,
        queryEmail: this.queryForm.value.queryEmail,
        queryMessage:
          `Message from Mr/Ms ${this.queryForm.value.queryName}:  ` +
          this.queryForm.value.queryMessage,
      };
      this.submitQuery(payload);
    } else {
      this.queryForm.markAllAsTouched();
    }
  }

  submitQuery(payload: any) {
    this.http
      .post(`${environment.baseUrl}/createQuery`, payload)
      .subscribe((data: any) => {
        this.dialogService.openDialog({
          data: {
            title: data.hasError ? 'Error' : 'Success',
            type: data.hasError ? 'error' : 'success',
            message: data.hasError
              ? data.extendedMessage
              : 'Query raised successfully',
          } as DialogData,
        });
      });
  }

  getFeatureList(list: any): Array<any> {
    return list.split(',');
  }

  checkProduct(index: number) {
    this.router.navigate(['pages/product/' + index]);
  }
}
