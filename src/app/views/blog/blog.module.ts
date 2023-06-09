import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogCategoryService } from './services/blog-category.service';
import { SharedModule } from '../../shared/shared.module';
import { BlogCategoriesComponent } from './components/blog-categories/blog-categories.component';
import { BlogCategoriesItemComponent } from './components/blog-categories/blog-categories-item/blog-categories-item.component';
import { AddNewCategoryDialogComponent } from './components/blog-categories/add-new-category-dialog/add-new-category-dialog.component';
import { BlogPostsComponent } from './components/blog-posts/blog-posts.component';
import { BlogPostItemComponent } from './components/blog-posts/blog-post-item/blog-post-item.component';
import { AddEditPostDialogComponent } from './components/blog-posts/add-edit-post-dialog/add-edit-post-dialog.component';

@NgModule({
  declarations: [
    BlogComponent,
    BlogCategoriesComponent,
    BlogCategoriesItemComponent,
    AddNewCategoryDialogComponent,
    BlogPostsComponent,
    BlogPostItemComponent,
    AddEditPostDialogComponent,
  ],
  imports: [CommonModule, SharedModule, BlogRoutingModule, RouterOutlet, FontAwesomeModule],
  providers: [BlogCategoryService],
})
export class BlogModule {}
