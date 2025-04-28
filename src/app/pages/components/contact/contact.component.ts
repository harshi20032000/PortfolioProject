import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CONSTANTS } from 'src/app/constants/constants';
import { SharedModule } from 'src/app/shared/shared.module';
import { GlobalVariable } from 'src/app/shared/utilities/global-veriables';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  facebookID = CONSTANTS.facebookID;
  instagramID = CONSTANTS.instagramID;
  salesDepartmentNum1 = CONSTANTS.salesDepartmentNumber1;
  salesDepartmentNum2 = CONSTANTS.salesDepartmentNumber2;
  officeLocation = CONSTANTS.officeLocation;
  assetPath = `${environment.assestsBasePath}images/Homepage`;
  bannerImages!: Array<any>;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    GlobalVariable.selectedPage = 'contact us';
    this.bannerImages =
      this.activatedRoute.snapshot.data['banners']?.responsePayload;
  }
}
