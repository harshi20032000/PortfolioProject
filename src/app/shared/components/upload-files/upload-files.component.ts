import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogData } from 'src/app/models/dialog-data';
import { environment } from 'src/environments/environment';
import { MatDialogService } from '../../services/mat-dialog.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-upload-files',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatSnackBarModule],
  templateUrl: './upload-files.component.html',
  styleUrl: './upload-files.component.css',
})
export class UploadFilesComponent implements OnInit {
  product: any;
  files: any[] = [];
  isDragging = false;
  assetPath = `${environment.assestsBasePath}images/Admin-Dashboard`;
  existingImages: Array<any> = [];
  productHexCode!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<UploadFilesComponent>,
    private productService: ProductService,
    private dialogService: MatDialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.existingImages = this.data.extras?.images;
    this.productHexCode = this.data.extras?.productHexCode;
    this.product = this.data.extras?.product;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const droppedFiles = Array.from(event.dataTransfer!.files);
    this.handleFiles(droppedFiles);
  }

  onFilesSelected(event: any) {
    const selectedFiles = Array.from(event.target.files);
    this.handleFiles(selectedFiles);
  }

  updateImageURL(imageURL: string) {
    const body = {
      productID: this.product.productID,
      imageURL: imageURL,
    };
    this.productService.updateProduct(body).subscribe((result) => {
      if (result && !result.hasError) {
        this.product.imageURL = result.responsePayload[0]?.imageURL;
        this.openSnackBar('Default Image updated successfully', 'Close');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  handleFiles(fileList: any[]) {
    for (let file of fileList) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        file.preview = e.target.result;
      };
      reader.readAsDataURL(file);
      this.files.push(file);
      console.log(this.files);
    }
  }

  isImage(file: any) {
    return file.type.startsWith('image/');
  }

  removeImage(index: number) {
    this.dialogService
      .openDialog({
        data: {
          title: 'Confirmation',
          message: 'Are you sure you want to delete this image ?',
          buttons: ['Cancel', 'Delete'],
        } as DialogData,
      })
      .afterClosed()
      .subscribe((dialogData: any) => {
        if (dialogData === 'Delete') {
          this.productService
            .deleteImage(this.existingImages[index])
            .subscribe((data: any) => {
              if (data && !data.hasError) {
                this.existingImages.splice(index, 1);
              }
            });
        }
      });
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  closeLoginPopup(result?: any) {
    this.dialogRef.close(result);
  }

  uploadFiles(): void {
    if (this.files && this.files.length > 0) {
      this.productService
        .uploadImage(this.product.productID, this.productHexCode, this.files)
        .forEach((result: any) => {
          if (result && !result.hasError) {
            this.closeLoginPopup(this.files);
          }
        });
    }
  }
}
