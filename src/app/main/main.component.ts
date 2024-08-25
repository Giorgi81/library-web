import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import posts from '../../db.json';
import { Info } from '../shared/interface/info.interface';
import { DetailsService } from '../shared/services/details.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {DescComponent} from "../desc/desc.component";
import {MaterialModule} from "../material/material.module";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    NgClass,
    NgForOf,
    DatePipe,
    NgIf
  ]
})
export class MainComponent implements OnInit {
  today = new Date();
  postForm: FormGroup;
  postsList: Info[] = [];
  currentItem: Info | undefined;
  isAddingPost: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private detailsService: DetailsService,
    private dialog: MatDialog
  ) {
    this.today.setHours(0, 0, 0, 0);

    this.postForm = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(2)]],
      book: ['', [Validators.required, Validators.minLength(2)]],
      fromPick: [this.today, Validators.required],
      toPick: [null, Validators.required],
      details: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const storedPostsList = JSON.parse(localStorage.getItem('postsList') || '[]');
    this.postsList = storedPostsList.length ? storedPostsList : posts.posts;
    this.currentItem = this.detailsService.getItem();
  }

  goToDetailsPage(id: number): void {
    const foundPost = this.postsList.find((post) => post.id === id);
    if (foundPost) {
      this.dialog.open(DescComponent, {
        data: {
          description: foundPost.details,
        },
      });
    } else {
      console.error('Post not found for ID:', id);
    }
  }

  addElement(): void {
    const { user, book, fromPick, toPick, details } = this.postForm.value;

    if (this.postForm.valid) {
      const newPost: Info = {
        id: this.postsList.length + 1,
        user,
        book,
        fromPick,
        toPick,
        details,
      };

      this.postsList.unshift(newPost);
      this.savePostsToLocalStorage();
      this.postForm.reset({ fromPick: this.today, toPick: null });
    }

    const controls: any = this.postForm?.controls;
    for (const c of Object.values(controls)) {
      const ad: any = c;
      ad.markAsPristine();
      ad.setErrors(null);
    }
  }

  savePostsToLocalStorage(): void {
    localStorage.setItem('postsList', JSON.stringify(this.postsList));
  }

  remove(postId: number): void {
    this.postsList = this.postsList.filter((post) => post.id !== postId);
    this.savePostsToLocalStorage();
  }
}
