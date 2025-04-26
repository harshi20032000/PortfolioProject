import { BreakpointObserver } from '@angular/cdk/layout';
import {
  STEPPER_GLOBAL_OPTIONS,
  StepperOrientation,
} from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxColorsModule } from 'ngx-colors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONSTANTS } from 'src/app/constants/constants';
import { DialogData } from 'src/app/models/dialog-data';
import { UploadFilesComponent } from 'src/app/shared/components/upload-files/upload-files.component';
import { MatDialogService } from 'src/app/shared/services/mat-dialog.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-action',
  standalone: true,
  imports: [SharedModule, NgxColorsModule],
  templateUrl: './product-action.component.html',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class ProductActionComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  product: any;
  featuresToOmit: any = CONSTANTS.featuresToOmitInAdmin;
  assetPath = `${environment.assestsBasePath}images/Admin-Dashboard`;
  stepperOrientation: Observable<StepperOrientation>;
  basicProductDetailsForm!: FormGroup;
  productInformationForm!: FormGroup;
  imagesByColor!: Array<any>;
  prodColors!: string;
  isColorEditable: boolean = false;
  categories = CONSTANTS.productItems;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private dialogService: MatDialogService,
    private productService: ProductService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.product =
      this.activatedRoute.snapshot.data['productDetails']?.productDetails;

    this.prodColors = this.product?.colorOptions;

    this.basicProductDetailsForm = this.createBasicProductForm();
  }

  createBasicProductForm(): FormGroup {
    return this.formBuilder.group({
      productID: [
        { value: this.product?.productID, disabled: this.product?.productID },
        Validators.required,
      ],
      productName: [this.product?.productName, Validators.required],
    });
  }

  createProductInformationForm(): FormGroup {
    const prodInfoForm: any = {};
    this.getProductFeatures.forEach((eachFeature: string) => {
      if (!this.featuresToOmit[eachFeature]) {
        prodInfoForm[eachFeature] = [this.product[eachFeature]];
      }
    });
    return this.formBuilder.group(prodInfoForm);
  }

  camelCaseToWords(str: string): string {
    const result = str.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  resetProductColors(): void {
    this.prodColors = this.product?.colorOptions;
    this.isColorEditable = false;
  }

  onBasicDetailsFilled(event: any): void {
    if (this.basicProductDetailsForm && this.basicProductDetailsForm.valid) {
      const newProd = {
        productID: this.basicProductDetailsForm.get('productID')?.value,
        productName: this.basicProductDetailsForm.get('productName')?.value,
      };
      if (this.isAddProductPage) {
        this.createNewProduct(newProd, true);
      } else {
        this.updateExistingProduct(newProd, true);
      }
    } else {
      this.basicProductDetailsForm.markAllAsTouched();
    }
  }

  onProdInfoFilled(): void {
    if (this.productInformationForm && this.productInformationForm.valid) {
      const productToUpdate = {
        productID: this.product.productID,
        ...this.productInformationForm.value,
      };
      this.updateExistingProduct(productToUpdate);
    } else {
      this.productInformationForm.markAllAsTouched();
    }
  }

  onImageUploaded(): void {
    this.moveToNextStep();
  }

  createNewColor(color: string): void {
    this.imagesByColor = [];
    if (color) {
      this.updateImageForColor(color)
        .afterClosed()
        .subscribe((uploadedImage: any) => {
          if (uploadedImage) {
            this.prodColors = this.prodColors
              ? this.prodColors + ',' + color
              : color;

            this.changeColor();
          }
        });
    }
  }

  removeColor(color: string, index: number): void {
    const data: DialogData = {
      title: 'Confirmation',
      message: 'Are you sure you want to delete this color?',
      buttons: ['Cancel', 'Delete'],
    };
    this.openDialog({ data })
      .afterClosed()
      .subscribe((dialogData: any) => {
        if (dialogData === 'Delete') {
          this.deleteColor(color, index);
        }
      });
  }

  deleteColor(color: string, index: number): void {
    this.productService
      .deleteColor(this.product.productID, color)
      .subscribe((data: any) => {
        if (data && !data.hasError) {
          this.isColorEditable = false;
          let colors = this.getColorOptions;
          colors.splice(index, 1);
          this.prodColors = colors.join(',');
          this.changeColor();
        }
      });
  }

  changeColor(): void {
    const newColor = {
      productID: this.product.productID,
      colorOptions: this.prodColors,
    };
    this.updateExistingProduct(newColor, false, false);
  }

  uploadImageForExistingColor(color: string, index: number): void {
    if (!this.isColorEditable) {
      this.searchImageByColor(color).subscribe((data: any) => {
        if (data && !data.hasError) {
          this.imagesByColor = data.responsePayload?.pictures;
          this.updateImageForColor(color)
            .afterClosed()
            .subscribe((_) => {
              this.checkIfImageExistForColor(color, index);
            });
        }
      });
    }
  }

  checkIfImageExistForColor(color: string, index: number): void {
    this.searchImageByColor(color).subscribe((data: any) => {
      if (data && !data.hasError) {
        this.imagesByColor = data.responsePayload?.pictures;
        if (!this.imagesByColor.length) {
          this.deleteColor(color, index);
        }
      }
    });
  }

  searchImageByColor(color: string): any {
    const customProd = {
      productID: this.product.productID,
      productColorHex: color,
    };
    return this.productService.searchImageByColor(customProd);
  }

  updateImageForColor(color: string): MatDialogRef<UploadFilesComponent> {
    const dialogInfo: MatDialogConfig = {
      width: window.screen.width > 450 ? '60%' : '100%',
      height: '60%',
      data: {
        extras: {
          images: this.imagesByColor,
          product: this.product,
          productHexCode: color,
        },
      },
    };
    return this.openDialog(dialogInfo, UploadFilesComponent);
  }

  createNewProduct(product: any, isFirstStep = false): void {
    this.productService
      .createProduct(product)
      .subscribe((createdProduct: any) => {
        if (createdProduct && !createdProduct.hasError) {
          this.product = createdProduct.responsePayload;
          if (isFirstStep) {
            this.productInformationForm = this.createProductInformationForm();
          }

          this.moveToNextStep();
        }
      });
  }

  updateExistingProduct(
    product: any,
    isFirstStep = false,
    isNextStepRequired = true
  ): void {
    this.productService
      .updateProduct(product)
      .subscribe((updatedProduct: any) => {
        if (updatedProduct && !updatedProduct.hasError) {
          this.product = updatedProduct.responsePayload[0];
          if (isFirstStep) {
            this.productInformationForm = this.createProductInformationForm();
          }

          if (isNextStepRequired) this.moveToNextStep();
        }
      });
  }

  moveToNextStep(): void {
    if (this.stepper && this.stepper.selected) {
      this.stepper.selected.completed = true;
      this.stepper.next();
    }
  }

  backToDashboard() {
    if (this.stepper && this.stepper.selected) {
      this.stepper.selected.completed = true;
      this.router.navigate(['admin/admin-dashboard']);
    }
  }

  editColors(): void {
    this.isColorEditable = !this.isColorEditable;
  }

  openDialog(data: MatDialogConfig, component?: any): MatDialogRef<any> {
    return this.dialogService.openDialog(data, component);
  }

  get getProductFeatures(): Array<string> {
    return Object.keys(this.product);
  }

  get getColorOptions(): Array<string> {
    return this.prodColors?.split(',');
  }

  get isAddProductPage(): boolean {
    return this.router.url === CONSTANTS.addProduct;
  }
}
