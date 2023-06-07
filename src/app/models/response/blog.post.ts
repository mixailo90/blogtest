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

  constructor(data: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.id = data?.id;
    this.title = data.title;
    this.text = data.text;
    this.categoryId = data.categoryId;
    this.createdAt = data.createdAt;
  }
}
