import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIcon, MatIconModule} from '@angular/material/icon';





@NgModule({
  exports : [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule

  ],
  declarations: [],
  imports: [
    CommonModule,

  ]
})
export class MaterialModule { }
