import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogPostResponse } from '../../../models/response/blog-post.response';
import { BaseService } from '../../../services/base.service';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService extends BaseService {
  constructor() {
    super('blogposts');
  }

  public filterByCategory(categoryId: number): Observable<BlogPostResponse[]> {
    let params = new HttpParams();
    params = params.set('categoryId', categoryId);
    const url = `${environment.API_BASE_URL}/${this.name}/getpostbycategory`;
    return this.http.get<BlogPostResponse[]>(url, { params }).pipe(map((response: any) => response.resultData));
  }
}
