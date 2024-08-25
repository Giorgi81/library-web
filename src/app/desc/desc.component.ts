import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MaterialModule} from "../material/material.module";
import {DatePipe} from "@angular/common";
import {DetailsService} from "../shared/services/details.service";

@Component({
  selector: 'app-desc',
  standalone: true,
  imports: [MaterialModule, DatePipe, RouterLink],
  templateUrl: './desc.component.html',
  styleUrl: './desc.component.scss'
})
export class DescComponent implements OnInit{

  currentItem: any;

  constructor(
    private route: ActivatedRoute,
    private detailsService: DetailsService,
  ) {

  }


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const items : any[] = JSON.parse(localStorage.getItem('postsList') || '');
    if(items?.length) {
      this.currentItem = items?.find((item) => item.id == id)
    }

  }

}
