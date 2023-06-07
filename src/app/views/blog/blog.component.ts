import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BlogCategoryService } from './services/blog-category.service';
import { FilterService } from './services/filter.service';
import { BaseComponent } from '../../shared/components/base.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent extends BaseComponent implements OnInit {
  private inputValueSubject = new Subject<string>();

  constructor(private blogCategoryService: BlogCategoryService, private filterService: FilterService) {
    super();
  }

  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.inputValueSubject.next(inputValue);
  }
  ngOnInit() {
    this.inputValueSubject.pipe(takeUntil(this.ngSubscriptions), debounceTime(800)).subscribe(value => {
      this.filterService.updateSearchTerm(value);
    });
  }
}
