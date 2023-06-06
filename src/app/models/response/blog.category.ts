export interface IBlogCategoryResponse {
  id: number;
  name: string;
}

export class BlogCategory implements IBlogCategoryResponse {
  id: number;
  name: string;

  constructor(data: any) {
    this.id = data?.id;
    this.name = data?.name;
  }
}
