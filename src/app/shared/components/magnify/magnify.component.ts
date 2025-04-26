import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MagnifyService } from '../../services/magnify.service';

@Component({
  selector: 'app-magnify',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './magnify.component.html',
})
export class MagnifyComponent implements OnInit {
  magnifiedContent!: any;
  isVisible = false;

  constructor(private magnifyService: MagnifyService) {}

  ngOnInit() {
    this.magnifyService.magnifyObservable.subscribe((data: any) => {
      this.magnifiedContent = data;
      this.isVisible = true;
    });
  }

  closeMagnify() {
    this.isVisible = false;
  }
}
