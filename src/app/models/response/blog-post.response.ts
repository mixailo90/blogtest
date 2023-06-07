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

  // eslint-disable-next-line no-explicit-any
  constructor(data: any) {
    this.id = data?.id;
    this.title = data.title;
    this.text = data.text;
    this.categoryId = data.categoryId;
    this.createdAt = data.createdAt;
  }
}
