import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../../../models/response/blog.post';
import { BaseService } from '../../../services/base.service';
import { ApiResponse } from '../../../models/response/common.response';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService extends BaseService {
  constructor() {
    super('blogposts');
  }

  public filterByCategory(categoryId: number): Observable<BlogPost[]> {
    let params = new HttpParams();
    params = params.set('categoryId', categoryId);
    const url = `${environment.API_BASE_URL}/${this.name}/getpostbycategory`;
    return this.http.get<ApiResponse<BlogPost[]>>(url, { params }).pipe(map(response => response.resultData));
  }
}
