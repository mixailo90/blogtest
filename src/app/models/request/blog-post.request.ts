export interface IBlogPostRequest {
  title: string;
  text: string;
  categoryId: number;
}

export class BlogPostRequest implements IBlogPostRequest {
  title: string;
  text: string;
  categoryId: number;
  constructor(title: string, text: string, categoryId: number) {
    this.title = title;
    this.text = text;
    this.categoryId = categoryId;
  }
}

export class BlogPostUpdateRequest implements IBlogPostRequest {
  id: number;
  title: string;
  text: string;
  categoryId: number;
  constructor(id: number, title: string, text: string, categoryId: number) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.categoryId = categoryId;
  }
}
