export interface IBlogCategoryRequest {
  name: string;
}

export class BlogCategoryRequest implements IBlogCategoryRequest {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
