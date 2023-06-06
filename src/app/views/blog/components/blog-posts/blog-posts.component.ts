import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogPostService } from '../../services/blog-post.service';
import { BlogPostResponse } from '../../../../models/response/blog-post.response';
import {FilterService} from "../../services/filter.service";
import {forkJoin} from "rxjs";

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
      // TODO: on term change
    });
    this.filterService.category$.subscribe((category: number) => {
      // TODO: on category change
    })
    this.getPosts();
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
