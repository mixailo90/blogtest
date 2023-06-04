import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {BlogComponent} from "./blog.component";
import {BlogRoutingModule} from "./blog-routing.module";

@NgModule({
  declarations: [BlogComponent],
  imports: [CommonModule, BlogRoutingModule, RouterOutlet],
  providers: [],
})
export class BlogModule {}
