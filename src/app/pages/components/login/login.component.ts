import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WebService } from 'src/app/shared/services/web.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private webService: WebService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private http: HttpClient
  ) {}

  closeLoginPopup(result?: any) {
    this.dialogRef.close(result);
  }

  onLogin() {
    const authPayload = {
      userID: this.loginForm?.value?.email,
      password: this.loginForm?.value?.password,
    };
    if (this.loginForm.valid) {
      this.http
        .post(`${environment.baseUrl}/authenticate`, authPayload)
        .subscribe((data: any) => {
          if (data && !data.hasError) {
            this.webService.setAuthentication(data.responsePayload.jwtToken);
            this.webService.setUserName(this.loginForm?.value?.email);
          }
          this.closeLoginPopup(data);
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
