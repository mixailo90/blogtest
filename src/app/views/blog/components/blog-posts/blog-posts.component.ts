import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs';
import { BlogPostService } from '../../services/blog-post.service';
import { BlogPost } from '../../../../models/response/blog.post';
import { FilterService } from '../../services/filter.service';
import { AddEditPostDialogComponent } from './add-edit-post-dialog/add-edit-post-dialog.component';
import { BlogPostRequest, BlogPostUpdateRequest, IBlogPostRequest } from '../../../../models/request/blog-post.request';
import { BaseComponent } from '../../../../shared/components/base.component';
import { LoaderService } from '../../../../services/loader.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss'],
})
export class BlogPostsComponent extends BaseComponent implements OnInit {
  posts: BlogPost[] = [];
  faPlus = faPlus;

  constructor(
    private blogPostService: BlogPostService,
    public dialog: MatDialog,
    private filterService: FilterService,
    private _snackBar: MatSnackBar,
    private loaderService: LoaderService,
  ) {
    super();
  }

  ngOnInit() {
    this.filterService.searchTerm$.pipe(takeUntil(this.ngSubscriptions)).subscribe((term: string) => {
      if (term === '') {
        this.loaderService.showLoader();
        this.getPosts();
      } else {
        this.loaderService.showLoader();
        let params = new HttpParams();
        params = params.set('term', term);
        this.blogPostService
          .search<BlogPost[]>(params)
          .pipe(takeUntil(this.ngSubscriptions))
          .subscribe({
            next: result => {
              this.posts = result;
              this.loaderService.hideLoader();
            },
            error: e => {
              this._snackBar.open(e, '', { duration: 3000 });
              this.loaderService.hideLoader();
            },
          });
      }
    });

    this.filterService.category$.pipe(takeUntil(this.ngSubscriptions)).subscribe((category: number) => {
      this.loaderService.showLoader();
      this.blogPostService
        .filterByCategory(category)
        .pipe(takeUntil(this.ngSubscriptions))
        .subscribe({
          next: result => {
            this.posts = result;
            this.loaderService.hideLoader();
          },
          error: e => {
            this._snackBar.open(e, '', { duration: 3000 });
            this.loaderService.hideLoader();
          },
        });
    });
  }

  private getPosts(): void {
    this.blogPostService
      .getList<BlogPost[]>()
      .pipe(takeUntil(this.ngSubscriptions))
      .subscribe({
        next: result => {
          this.posts = result;
          this.loaderService.hideLoader(2);
        },
        error: e => {
          this._snackBar.open(e, '', { duration: 3000 });
          this.loaderService.hideLoader(2);
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
              .update<BlogPost, IBlogPostRequest>(selectedData.id, updated)
              .pipe(takeUntil(this.ngSubscriptions))
              .subscribe({
                next: () => {
                  // Response should return here updated object if we want to replace existing item on client without another call, instead we will call for all data again
                  // const index = this.posts.findIndex(item => item.id === selectedData.id);
                  // this.posts[index] = (new BlogPostResponse(result));
                  this.filterService.updateSearchTerm('');
                },
                error: e => {
                  this._snackBar.open(e, '', { duration: 3000 });
                },
              });
          } else {
            const newPost = new BlogPostRequest(data.title, data.text, data.categoryId | 0);
            this.blogPostService
              .create<BlogPost, IBlogPostRequest>(newPost)
              .pipe(takeUntil(this.ngSubscriptions))
              .subscribe({
                next: () => {
                  this.filterService.updateSearchTerm('');
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
