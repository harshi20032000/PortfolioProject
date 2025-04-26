import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { GlobalVariable } from 'src/app/shared/utilities/global-veriables';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent implements OnInit {
  assetPath = `${environment.assestsBasePath}images/About`;
  productAssetPath = `${environment.assestsBasePath}images/Product Page`;
  bannerImages!: Array<any>;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    GlobalVariable.selectedPage = 'about';
    this.bannerImages =
      this.activatedRoute.snapshot.data['banners']?.responsePayload;
  }
}
