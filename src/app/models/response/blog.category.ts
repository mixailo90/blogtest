export interface IBlogCategoryResponse {
  id: number;
  name: string;
}

export class BlogCategory implements IBlogCategoryResponse {
  id: number;
  name: string;
  constructor(data: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.id = data?.id;
    this.name = data?.name;
  }
}
