export interface IBlogPostResponse {
  id: number;
  title: string;
  text: string;
  categoryId: number;
}
export class BlogPostResponse implements IBlogPostResponse {
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
