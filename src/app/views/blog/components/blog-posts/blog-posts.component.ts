import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogPostService } from '../../services/blog-post.service';
import { BlogPostResponse } from '../../../../models/response/blog-post.response';
import { FilterService } from '../../services/filter.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BlogCategoryRequest } from '../../../../models/request/blog-category.request';
import { BlogCategory } from '../../../../models/response/blog.category';
import { AddEditPostDialogComponent } from './add-edit-post-dialog/add-edit-post-dialog.component';
import { BlogPostRequest, BlogPostUpdateRequest, IBlogPostRequest } from '../../../../models/request/blog-post.request';
import { BaseComponent } from '../../../../shared/components/base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss'],
})
export class BlogPostsComponent extends BaseComponent implements OnInit {
  posts: BlogPostResponse[] = [];
  faPlus = faPlus;
  constructor(
    private blogPostService: BlogPostService,
    public dialog: MatDialog,
    private filterService: FilterService,
    private _snackBar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit() {
    this.filterService.searchTerm$.pipe(takeUntil(this.ngSubscriptions)).subscribe((term: string) => {
      if (term === '') {
        this.getPosts();
      } else {
        let params = new HttpParams();
        params = params.set('term', term);
        this.blogPostService
          .search<BlogPostResponse[]>(params)
          .pipe(takeUntil(this.ngSubscriptions))
          .subscribe({
            next: result => {
              this.posts = result;
            },
            error: e => {
              this._snackBar.open(e, '', { duration: 3000 });
            },
          });
      }
    });
    this.filterService.category$.pipe(takeUntil(this.ngSubscriptions)).subscribe((category: number) => {
      this.blogPostService
        .filterByCategory(category)
        .pipe(takeUntil(this.ngSubscriptions))
        .subscribe({
          next: result => {
            this.posts = result;
          },
          error: e => {
            this._snackBar.open(e, '', { duration: 3000 });
          },
        });
    });
  }

  private getPosts(): void {
    this.blogPostService
      .getList<BlogPostResponse[]>()
      .pipe(takeUntil(this.ngSubscriptions))
      .subscribe({
        next: result => {
          this.posts = result;
        },
        error: e => {
          this._snackBar.open(e, '', { duration: 3000 });
        },
      });
  }

  openPostDialog(selectedData: BlogPostUpdateRequest | undefined = undefined): void {
    const dialogRef = this.dialog.open(AddEditPostDialogComponent, { data: selectedData });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.ngSubscriptions))
      .subscribe(data => {
        if (data) {
          if (selectedData) {
            const updated = new BlogPostUpdateRequest(selectedData.id, data.title, data.text, data.categoryId | 0);
            this.blogPostService
              .update<BlogPostResponse, IBlogPostRequest>(selectedData.id, updated)
              .pipe(takeUntil(this.ngSubscriptions))
              .subscribe({
                next: result => {
                  // Response should return here updated object if we want to replace existing item on client without another call, instead we will call getPosts again
                  // const index = this.posts.findIndex(item => item.id === selectedData.id);
                  // this.posts[index] = (new BlogPostResponse(result));
                  this.getPosts();
                },
                error: e => {
                  this._snackBar.open(e, '', { duration: 3000 });
                },
              });
          } else {
            const newPost = new BlogPostRequest(data.title, data.text, data.categoryId | 0);
            this.blogPostService
              .create<BlogPostResponse, IBlogPostRequest>(newPost)
              .pipe(takeUntil(this.ngSubscriptions))
              .subscribe({
                next: result => {
                  this.posts.push(new BlogPostResponse(result));
                },
                error: e => {
                  this._snackBar.open(e, '', { duration: 3000 });
                },
              });
          }
        }
      });
  }
  deletePost(id: number | null) {
    this.blogPostService
      .delete(id)
      .pipe(takeUntil(this.ngSubscriptions))
      .subscribe({
        next: () => {
          const index = this.posts.findIndex(item => item.id === id);
          this.posts.splice(index, 1);
        },
        error: e => {
          this._snackBar.open(e, '', { duration: 3000 });
        },
      });
  }
}
