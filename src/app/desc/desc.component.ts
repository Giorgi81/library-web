import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DetailsService} from "../services/details.service";
import {MaterialModule} from "../material/material.module";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-desc',
  standalone: true,
  imports: [MaterialModule, DatePipe],
  templateUrl: './desc.component.html',
  styleUrl: './desc.component.scss'
})
export class DescComponent {

  currentItem: any;

  constructor(
    private route: ActivatedRoute,
    private detailsService: DetailsService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.currentItem = this.detailsService.getItem();
    }
  }

}
