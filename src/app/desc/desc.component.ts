import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MaterialModule} from "../material/material.module";
import {DatePipe} from "@angular/common";
import {DetailsService} from "../shared/services/details.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-desc',
  standalone: true,
  imports: [MaterialModule, DatePipe, RouterLink],
  templateUrl: './desc.component.html',
  styleUrl: './desc.component.scss'
})
export class DescComponent {



  constructor(@Inject(MAT_DIALOG_DATA) public data: { description: string }) {}




}
