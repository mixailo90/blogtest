import { Component, OnInit } from '@angular/core';
import { BlogCategoryService } from '../../services/blog-category.service';
import { BlogCategoryResponse } from '../../../../models/response/blog-category.response';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { AddNewCategoryDialogComponent } from './add-new-category-dialog/add-new-category-dialog.component';

@Component({
  selector: 'app-blog-categories',
  templateUrl: './blog-categories.component.html',
  styleUrls: ['./blog-categories.component.scss'],
})
export class BlogCategoriesComponent implements OnInit {
  categories: BlogCategoryResponse[] = [];

  constructor(private blogCategoryService: BlogCategoryService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewCategoryDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.blogCategoryService.create(result).subscribe({
        next: result => {
          this.categories.push(result);
        },
        error: e => {
          console.log(e);
        },
      });
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
  private getCategories(): void {
    this.blogCategoryService.getList().subscribe({
      next: result => {
        this.categories = result;
      },
      error: e => {
        console.log(e);
      },
    });
  }
}
