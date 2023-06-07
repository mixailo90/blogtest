import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlogPostResponse } from '../../../../../models/response/blog-post.response';
import { BlogCategory } from '../../../../../models/response/blog.category';
import { BlogCategoryService } from '../../../services/blog-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../../shared/components/base.component';

@Component({
  selector: 'app-add-edit-post-dialog',
  templateUrl: './add-edit-post-dialog.component.html',
  styleUrls: ['./add-edit-post-dialog.component.scss'],
})
export class AddEditPostDialogComponent extends BaseComponent {
  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
    categoryId: ['', Validators.required],
  });
  categories: BlogCategory[] = [];
  editMode: boolean = false;

  constructor(
    private blogCategoryService: BlogCategoryService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddEditPostDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: BlogPostResponse,
  ) {
    super();
  }

  ngOnInit() {
    console.log(this.data);
    this.form = this.fb.group({
      title: [this.data?.title, Validators.required],
      text: [this.data?.text, Validators.required],
      categoryId: [this.data?.categoryId],
    });
    this.getCategories();
    this.editMode = !!this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
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
