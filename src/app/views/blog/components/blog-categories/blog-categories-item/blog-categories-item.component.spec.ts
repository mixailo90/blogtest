import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCategoriesItemComponent } from './blog-categories-item.component';

describe('BlogCategoriesItemComponent', () => {
  let component: BlogCategoriesItemComponent;
  let fixture: ComponentFixture<BlogCategoriesItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogCategoriesItemComponent],
    });
    fixture = TestBed.createComponent(BlogCategoriesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
