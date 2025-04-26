import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONSTANTS } from 'src/app/constants/constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  phoneNumber = CONSTANTS.phoneNumber;
  facebookID = CONSTANTS.facebookID;
  instagramID = CONSTANTS.instagramID;
  officeLocation = CONSTANTS.officeLocation;
}
