import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DialogData } from 'src/app/models/dialog-data';

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-box.component.html',
})
export class DialogBoxComponent implements OnInit {
  title = 'Error';
  message = 'Oops!! Something Went Wrong';
  type = 'error';
  buttons = ['Ok'];
  inputForm!: FormControl;
  inputLevel!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<DialogBoxComponent>
  ) {}

  ngOnInit(): void {
    this.type = this.data.type ?? this.type;
    this.title = this.data.title ?? this.title;
    this.message = this.data.message ?? this.message;
    this.buttons = this.data.buttons ?? this.buttons;
    if (this.data.extras && this.data.extras.inputLevel) {
      this.inputForm = new FormControl();
      this.inputLevel = this.data.extras.inputLevel;
    }
  }

  closeDialog(button: string) {
    if (this.inputLevel && this.inputForm) {
      if (this.inputForm.valid) {
        this.dialogRef.close({ button, key: this.inputForm.value });
      } else {
        this.inputForm.markAllAsTouched();
      }
    } else {
      this.dialogRef.close(button);
    }
  }
}
