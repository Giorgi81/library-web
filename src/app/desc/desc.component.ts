import {Component, Inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MaterialModule} from "../material/material.module";
import {DatePipe} from "@angular/common";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-desc',
  standalone: true,
  imports: [MaterialModule, DatePipe, RouterLink],
  templateUrl: './desc.component.html',
  styleUrl: './desc.component.scss'
})
export class DescComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { description: string }) {

  }
}
