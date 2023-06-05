import { Component, OnInit } from '@angular/core';
import { BlogCategoryService } from './services/blog-category.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  constructor(private blogCategoryService: BlogCategoryService) {}

  ngOnInit() {
    // this.blogCategoryService.getAll().subscribe((response: BlogCategoryResponse[])=>{
    //   console.log(response)
    // })
  }
}
