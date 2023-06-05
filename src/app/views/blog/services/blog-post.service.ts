import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogPostResponse } from '../../../models/response/blog-post.response';
import { BlogPostRequest, BlogPostUpdateRequest } from '../../../models/request/blog-post.request';

@Injectable({
  providedIn: 'root',
})
export class BlogCategoryService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<BlogPostResponse[]> {
    const url = `${environment.API_BASE_URL}/blogposts`;
    return this.http.get<BlogPostResponse[]>(url).pipe(map((response: any) => response.resultData));
  }

  public getOne(id: number): Observable<BlogPostResponse> {
    const url = `${environment.API_BASE_URL}/blogposts/${id}`;
    return this.http.get<BlogPostResponse>(url).pipe(map((response: any) => response.resultData));
  }

  public search(term: string): Observable<BlogPostResponse[]> {
    let params = new HttpParams();
    params = params.set('term', term);
    const url = `${environment.API_BASE_URL}/blogposts/search`;
    return this.http.get<BlogPostResponse[]>(url, { params }).pipe(map((response: any) => response.resultData));
  }

  public filterByCategory(categoryId: number): Observable<BlogPostResponse[]> {
    let params = new HttpParams();
    params = params.set('categoryId', categoryId);
    const url = `${environment.API_BASE_URL}/blogposts/getpostbycategory`;
    return this.http.get<BlogPostResponse[]>(url, { params }).pipe(map((response: any) => response.resultData));
  }

  public create(title: string, text: string, categoryId: number): Observable<BlogPostResponse> {
    const body: BlogPostRequest = new BlogPostRequest(title, text, categoryId);
    const url = `${environment.API_BASE_URL}/blogposts`;
    return this.http.post<BlogPostResponse>(url, body);
  }

  public update(id: number, title: string, text: string, categoryId: number): Observable<BlogPostResponse> {
    const body: BlogPostUpdateRequest = new BlogPostUpdateRequest(id, title, text, categoryId);
    const url = `${environment.API_BASE_URL}/blogposts/${id}`;
    return this.http.post<BlogPostResponse>(url, body);
  }

  public delete(id: number): Observable<void> {
    const url = `${environment.API_BASE_URL}/blogposts/${id}`;
    return this.http.delete<void>(url);
  }
}
