export interface IBlogCategoryResponse {
  id: number;
  name: string;
}
export class BlogCategoryResponse implements IBlogCategoryResponse {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
