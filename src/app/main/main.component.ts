import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import posts from '../../db.json';
import { Info } from './interface';
import { Router } from '@angular/router';
import { DetailsService } from '../services/details.service';
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [
    NgClass,
    DatePipe,
    NgForOf,
    MaterialModule,
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true,
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
    private detailsService: DetailsService
  ) {
    this.today.setHours(0, 0, 0, 0);

    this.postForm = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(2)]],
      book: ['', [Validators.required, Validators.minLength(2)]],
      fromPick: [this.today, Validators.required],
      toPick: [null, Validators.required],
      details: ['', Validators.required]  // Added 'details' field
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
      this.currentItem = foundPost;
      this.detailsService.setItem(this.currentItem);
      this.router.navigate(['/desc', this.currentItem.id]);
    } else {
      console.error('Post not found for ID:', id);
    }
  }

  addElement(): void {
    if (this.postForm.valid) {
      const newPost: Info = {
        id: this.postsList.length + 1,
        user: this.postForm.get('user')?.value,
        book: this.postForm.get('book')?.value,
        fromPick: this.postForm.get('fromPick')?.value,
        toPick: this.postForm.get('toPick')?.value,
        details: this.postForm.get('details')?.value
      };

      this.postsList.unshift(newPost);
      this.savePostsToLocalStorage();
      this.postForm.reset({ fromPick: this.today, toPick: null });
    }
  }

  savePostsToLocalStorage(): void {
    localStorage.setItem('postsList', JSON.stringify(this.postsList));
  }

  remove(postId: number): void {
    this.postsList = this.postsList.filter(post => post.id !== postId);
    this.savePostsToLocalStorage();
  }
}
