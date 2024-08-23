import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DetailsService} from "../details.service";

@Component({
  selector: 'app-desc',
  standalone: true,
  imports: [],
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
