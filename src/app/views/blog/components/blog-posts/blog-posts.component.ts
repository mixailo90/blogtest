import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogPostService } from '../../services/blog-post.service';
import { BlogPostResponse } from '../../../../models/response/blog-post.response';
import { FilterService } from '../../services/filter.service';
import { forkJoin } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss'],
})
export class BlogPostsComponent implements OnInit {
  posts: BlogPostResponse[] = [];

  constructor(private blogPostService: BlogPostService, public dialog: MatDialog, private filterService: FilterService) {}

  ngOnInit() {
    this.filterService.searchTerm$.subscribe((term: string) => {
      if (term === '') {
        this.getPosts();
      } else {
        let params = new HttpParams();
        params = params.set('term', term);
        this.blogPostService.search<BlogPostResponse[]>(params).subscribe({
          next: result => {
            this.posts = result;
          },
          error: e => {
            console.log(e);
          },
        });
      }
    });
    this.filterService.category$.subscribe((category: number) => {
      this.blogPostService.filterByCategory(category).subscribe({
        next: result => {
          this.posts = result;
        },
        error: e => {
          console.log(e);
        },
      });
    });
  }

  private getPosts(): void {
    this.blogPostService.getList<BlogPostResponse[]>().subscribe({
      next: result => {
        this.posts = result;
      },
      error: e => {
        console.log(e);
      },
    });
  }
}
