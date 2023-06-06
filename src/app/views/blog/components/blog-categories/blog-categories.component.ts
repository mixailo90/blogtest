import { Component, OnInit } from '@angular/core';
import { BlogCategoryService } from '../../services/blog-category.service';
import { BlogCategory } from '../../../../models/response/blog.category';
import { MatDialog } from '@angular/material/dialog';
import { AddNewCategoryDialogComponent } from './add-new-category-dialog/add-new-category-dialog.component';
import { BlogCategoryRequest } from '../../../../models/request/blog-category.request';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-blog-categories',
  templateUrl: './blog-categories.component.html',
  styleUrls: ['./blog-categories.component.scss'],
})
export class BlogCategoriesComponent implements OnInit {
  categories: BlogCategory[] = [];

  constructor(private blogCategoryService: BlogCategoryService, public dialog: MatDialog, private filterService: FilterService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewCategoryDialogComponent);
    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        const newCategory = new BlogCategoryRequest(name);
        this.blogCategoryService.create<BlogCategory, BlogCategoryRequest>(newCategory).subscribe({
          next: result => {
            console.log(result);
            this.categories.push(new BlogCategory(result));
            console.log(this.categories);
          },
          error: e => {
            console.log(e);
          },
        });
      }
    });
  }
  ngOnInit() {
    this.getCategories();
  }
  deleteCategory(id: number | null) {
    this.blogCategoryService.delete(id).subscribe({
      next: result => {
        const index = this.categories.findIndex(item => item.id === id);
        this.categories.splice(index, 1);
      },
      error: e => {
        console.log(e);
      },
    });
  }

  selectCategory(id: number): void {
    this.filterService.updateCategory(id);
  }

  private getCategories(): void {
    this.blogCategoryService.getList<BlogCategory[]>().subscribe({
      next: result => {
        this.categories = (result || []).map(category => new BlogCategory(category));
      },
      error: e => {
        console.log(e);
      },
    });
  }
}
