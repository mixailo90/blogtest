import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogCategoryService } from './services/blog-category.service';

@NgModule({
  declarations: [BlogComponent],
  imports: [CommonModule, BlogRoutingModule, RouterOutlet],
  providers: [BlogCategoryService],
})
export class BlogModule {}
