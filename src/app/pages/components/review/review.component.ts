import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-review',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent implements OnInit {
  assetPath = `${environment.assestsBasePath}images/Homepage`;
  testimonials: any = [];
  bannerImages!: Array<any>;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.testimonials =
      this.activatedRoute.snapshot.data['reviewDetails']?.testimonials;
    this.bannerImages =
      this.activatedRoute.snapshot.data['banners']?.responsePayload;
  }
}
