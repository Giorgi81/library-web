import { Component, OnInit } from '@angular/core';
import posts from '../../db.json';
import { Info } from './interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DetailsService } from '../details.service';
import { DataService } from '../data.service';
import { DatePipe, NgClass, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

interface BlogPost {
  id: any;
  book: any;
  user: any;
  date?: any;
  description: any;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [NgClass, DatePipe, NgForOf, MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule],
  standalone: true,
})
export class MainComponent implements OnInit {
  randomDate = new Date();
  postsList: Info[] = [];
  currentItem: Info | undefined;
  isAddingPost: boolean = false;

  constructor(
    private router: Router,
    private DetailsService: DetailsService,
    private DataService: DataService,
    private http: HttpClient
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

  toggleAddPost() {
    this.isAddingPost = !this.isAddingPost;
  }

  addElement(user: any, book: any, desc: any) {
    const newPost: BlogPost = {
      id: this.postsList.length + 1,
      book: book.value,
      user: user.value,
      date: new Date().toISOString(),
      description: desc.value,
    };

    this.postsList.unshift(newPost);
    this.savePostsToLocalStorage();

    this.DataService.addPost(newPost).subscribe((response: any) => {
      console.log('Response from addPost:', response);
    });

    book.value = '';
    user.value = '';
    desc.value = '';
  }

  savePostsToLocalStorage() {
    localStorage.setItem('postsList', JSON.stringify(this.postsList));
  }

  remove(postId: number) {
    this.postsList = this.postsList.filter(post => post.id != postId);
    this.savePostsToLocalStorage();
  }
}
