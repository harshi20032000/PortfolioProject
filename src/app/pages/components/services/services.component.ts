import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit {
  assetPath = `${environment.assestsBasePath}images/Homepage`;
  bannerImages!: Array<any>;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.bannerImages =
      this.activatedRoute.snapshot.data['banners']?.responsePayload;
  }
}
