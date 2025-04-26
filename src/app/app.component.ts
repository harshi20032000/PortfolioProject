import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoaderService } from './shared/services/loader.service';
import { SharedModule } from './shared/shared.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'rickshaw-website';
  loading: boolean = false;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this.loaderService.loadingSub
      .pipe(delay(0))
      .subscribe((loading: boolean) => {
        this.loading = loading;
      });
  }
}
