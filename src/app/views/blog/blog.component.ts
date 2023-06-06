import { Component, OnInit } from '@angular/core';
import { BlogCategoryService } from './services/blog-category.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FilterService } from './services/filter.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  private inputValueSubject = new Subject<string>();
  constructor(private blogCategoryService: BlogCategoryService, private filterService: FilterService) {
    this.inputValueSubject.pipe(debounceTime(800)).subscribe(value => {
      this.filterService.updateSearchTerm(value);
    });
  }

  onInputChange(event: any) {
    const inputValue = event.target.value;
    this.inputValueSubject.next(inputValue);
  }
  ngOnInit() {
    // this.blogCategoryService.getAll().subscribe((response: BlogCategoryResponse[])=>{
    //   console.log(response)
    // })
  }
}
