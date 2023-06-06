import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogCategoryRequest } from '../../../models/request/blog-category.request';
import { BlogCategoryResponse } from '../../../models/response/blog-category.response';

@Injectable({
  providedIn: 'root',
})
export class BlogCategoryService {
  constructor(private http: HttpClient) {}

  public getList(): Observable<BlogCategoryResponse[]> {
    const url = `${environment.API_BASE_URL}/category`;
    return this.http.get<BlogCategoryResponse[]>(url).pipe(map((response: any) => response.resultData));
  }

  public create(name: string): Observable<BlogCategoryResponse> {
    const body: BlogCategoryRequest = new BlogCategoryRequest(name);
    const url = `${environment.API_BASE_URL}/category`;
    return this.http.post<BlogCategoryResponse>(url, body);
  }

  public delete(id: number | null): Observable<void> {
    const url = `${environment.API_BASE_URL}/category/${id}`;
    return this.http.delete<void>(url);
  }
}
