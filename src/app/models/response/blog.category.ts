export interface IBlogCategoryResponse {
  id: number;
  name: string;
}

export class BlogCategory implements IBlogCategoryResponse {
  id: number;
  name: string;

  // eslint-disable-next-line no-explicit-any
  constructor(data: any) {
    this.id = data?.id;
    this.name = data?.name;
  }
}
