import { Component, OnInit } from '@angular/core';
import posts from '../../db.json';
import { Info } from './interface';
import { Router } from '@angular/router';
import { DetailsService } from '../services/details.service';
import { DatePipe, NgClass, NgForOf } from '@angular/common';
import {MaterialModule} from "../material/material.module";




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [
    NgClass,
    DatePipe,
    NgForOf,
    MaterialModule

  ],
  standalone: true,
})
export class MainComponent implements OnInit {
  // randomDate = new Date();
  postsList: Info[] = [];
  currentItem: Info | undefined;
  isAddingPost: boolean = false;

  constructor(
    private router: Router,
    private DetailsService: DetailsService,
  ) {}

  ngOnInit(): void {
    const storedPostsList = JSON.parse(
      localStorage.getItem('postsList') || '[]'
    );
    this.postsList = storedPostsList.length ? storedPostsList : posts.posts;
    this.currentItem = this.DetailsService.getItem();
  }

  goToDetailsPage(id: number) {
    const foundPost = this.postsList.find((post) => post.id === id);
    if (foundPost) {
      this.currentItem = foundPost;
      this.DetailsService.setItem(this.currentItem);
      this.router.navigate(['/desc', this.currentItem.id]);
    } else {
      console.error('Post not found for ID:', id);
    }
  }



  addElement(user: any, book: any) {
    const newPost: Info = {
      id: this.postsList.length + 1,
      book: book.value,
      user: user.value,
      date: new Date().toISOString(),


    };

    this.postsList.unshift(newPost);
    this.savePostsToLocalStorage();



    book.value = '';
    user.value = '';
  }

  savePostsToLocalStorage() {
    localStorage.setItem('postsList', JSON.stringify(this.postsList));
  }

  remove(postId: number) {
    this.postsList = this.postsList.filter(post => post.id != postId);
    this.savePostsToLocalStorage();
  }
}
