import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BlogCategoryService } from './services/blog-category.service';
import { FilterService } from './services/filter.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  private inputValueSubject = new Subject<string>();

  constructor(private blogCategoryService: BlogCategoryService, private filterService: FilterService) {}

  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.inputValueSubject.next(inputValue);
  }
  ngOnInit() {
    this.inputValueSubject.pipe(debounceTime(800)).subscribe(value => {
      this.filterService.updateSearchTerm(value);
    });
  }
}
