export interface IBlogPostResponse {
  id: number;
  title: string;
  text: string;
  categoryId: number;
  createdAt: Date;
}
export class BlogPostResponse implements IBlogPostResponse {
  id: number;
  title: string;
  text: string;
  categoryId: number;
  createdAt: Date;

  constructor(id: number, title: string, text: string, categoryId: number, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.categoryId = categoryId;
    this.createdAt = createdAt;
  }
}
