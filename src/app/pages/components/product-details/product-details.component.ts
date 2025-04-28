import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductDetailsService } from 'src/app/shared/services/ProductDetailsService';
import { CONSTANTS } from 'src/app/constants/constants';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MatDialogService } from 'src/app/shared/services/mat-dialog.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  images!: Array<any>;
  selectedImage: any;
  product: any;
  queryForm = new FormGroup({
    queryName: new FormControl('', Validators.required),
    queryEmail: new FormControl('', [Validators.required, Validators.email]),
    queryPhone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/),
    ]),
    queryMessage: new FormControl('', Validators.required),
  });
  selectedColor!: string;
  productFeatures: any = CONSTANTS.productFeatures;
  assetPath = `${environment.assestsBasePath}images/Product Page`;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productDetailsService: ProductDetailsService,
    private dialogService: MatDialogService,
    private viewportScroller: ViewportScroller,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.product = data.productDetails.productDetails;

      if (this.product.colorOptions) {
        this.selectedColor = this.colorOption(0);
        this.getProductImages();
      }
    });
  }

  get getProductFeatures(): string[] {
    return Object.keys(this.productFeatures);
  }

  get getScreenWidth(): number {
    return window.screen.width;
  }

  onQueryRaise(elementId: string) {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  changeSelectedColor(color: any) {
    this.selectedColor = color;
    this.getProductImages();
  }

  getProductImages(): void {
    this.loader.setLoading(true, `${environment.baseUrl}/getImageByColor`);
    this.productDetailsService.getProductImages(this.product.productID, this.selectedColor).subscribe(
      (data: any) => {
        if (data && !data.hasError) {
          this.images = data.responsePayload?.pictures;
          this.selectedImage = this.images[0];
          this.loader.setLoading(false, `${environment.baseUrl}/getImageByColor`);
        }
      }
    );
  }

  colorOption(index: number): string {
    return this.product.colorOptions.split(',')[index];
  }

  sendQuery() {
    if (this.queryForm.valid) {
      const payload = {
        queryID: uuidv4(),
        queryPhone: this.queryForm.value.queryPhone + '',
        queryEmail: this.queryForm.value.queryEmail,
        queryMessage:
          `Message from Mr/Ms ${this.queryForm.value.queryName}:  ` +
          this.queryForm.value.queryMessage,
        forProduct: this.product.productId,
      };
      this.productDetailsService.sendQuery(payload).subscribe((data: any) => {
        this.dialogService.openDialog({
          data: {
            title: data.hasError ? 'Error' : 'Success',
            type: data.hasError ? 'error' : 'success',
            message: data.hasError
              ? data.extendedMessage
              : 'Query raised successfully',
          },
        });
      });
    } else {
      this.queryForm.markAllAsTouched();
    }
  }

  changeSelectedImage(image: string) {
    this.selectedImage = image;
  }

  checkProduct(index: number) {
    this.router.navigate(['pages/product/' + index]);
    document.getElementById('product-view')?.scrollIntoView();
  }
}
