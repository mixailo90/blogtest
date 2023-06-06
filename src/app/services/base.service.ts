import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/response/common.response';

export abstract class BaseService {
  protected http: HttpClient;
  protected name: string;

  protected constructor(name: string) {
    this.http = inject(HttpClient);
    this.name = name;
  }

  public getList<T>(): Observable<T> {
    const url = `${environment.API_BASE_URL}/${this.name}`;
    return this.http.get<ApiResponse<T>>(url).pipe(map(response => response.resultData));
  }

  public get<T>(id: number): Observable<T> {
    const url = `${environment.API_BASE_URL}/${this.name}/${id}`;
    return this.http.get<ApiResponse<T>>(url).pipe(map(response => response.resultData));
  }

  public search<T>(params: HttpParams): Observable<T[]> {
    const url = `${environment.API_BASE_URL}/${this.name}/search`;
    return this.http.get<ApiResponse<T>>(url, { params }).pipe(map((response: any) => response.resultData));
  }

  public create<T, K>(body: K): Observable<T> {
    const url = `${environment.API_BASE_URL}/${this.name}`;
    return this.http.post<T>(url, body);
  }

  public update<T, K>(id: number, body: K): Observable<T> {
    const url = `${environment.API_BASE_URL}/${this.name}/${id}`;
    return this.http.put<ApiResponse<T>>(url, body).pipe(map(response => response.resultData));
  }

  public delete(id: number | null): Observable<void> {
    const url = `${environment.API_BASE_URL}/${this.name}/${id}`;
    return this.http.delete<void>(url);
  }
}
