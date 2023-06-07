import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs';
import { BlogCategoryService } from '../../services/blog-category.service';
import { BlogCategory } from '../../../../models/response/blog.category';
import { AddNewCategoryDialogComponent } from './add-new-category-dialog/add-new-category-dialog.component';
import { BlogCategoryRequest } from '../../../../models/request/blog-category.request';
import { FilterService } from '../../services/filter.service';
import { BaseComponent } from '../../../../shared/components/base.component';

@Component({
  selector: 'app-blog-categories',
  templateUrl: './blog-categories.component.html',
  styleUrls: ['./blog-categories.component.scss'],
})
export class BlogCategoriesComponent extends BaseComponent implements OnInit {
  categories: BlogCategory[] = [];
  selectedCategoryId = -1;

  constructor(
    private blogCategoryService: BlogCategoryService,
    public dialog: MatDialog,
    private filterService: FilterService,
    private _snackBar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit() {
    this.getCategories();
    this.filterService.searchTerm$.pipe(takeUntil(this.ngSubscriptions)).subscribe((term: string) => {
      if (term === '') {
        this.selectedCategoryId = -1;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewCategoryDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.ngSubscriptions))
      .subscribe(name => {
        if (name) {
          const newCategory = new BlogCategoryRequest(name);
          this.blogCategoryService
            .create<BlogCategory, BlogCategoryRequest>(newCategory)
            .pipe(takeUntil(this.ngSubscriptions))
            .subscribe({
              next: result => {
                this.categories.push(new BlogCategory(result));
              },
              error: e => {
                this._snackBar.open(e, '', { duration: 3000 });
              },
            });
        }
      });
  }

  deleteCategory(data: { id: number | null; event: MouseEvent }) {
    data.event.stopPropagation();
    this.blogCategoryService
      .delete(data.id)
      .pipe(takeUntil(this.ngSubscriptions))
      .subscribe({
        next: () => {
          const index = this.categories.findIndex(item => item.id === data.id);
          this.categories.splice(index, 1);
        },
        error: e => {
          this._snackBar.open(e, '', { duration: 3000 });
        },
      });
  }

  selectCategory(id: number | null): void {
    if (typeof id === 'number') {
      this.selectedCategoryId = id;
      if (id === -1) {
        this.filterService.updateSearchTerm('');
      } else {
        this.filterService.updateCategory(id);
      }
    }
  }

  private getCategories(): void {
    this.blogCategoryService
      .getList<BlogCategory[]>()
      .pipe(takeUntil(this.ngSubscriptions))
      .subscribe({
        next: result => {
          this.categories = (result || []).map(category => new BlogCategory(category));
        },
        error: e => {
          this._snackBar.open(e, '', { duration: 3000 });
        },
      });
  }
}
