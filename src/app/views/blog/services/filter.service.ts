import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchTerm$ = this.searchTerm.asObservable();

  private category: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public category$ = this.category.asObservable();

  constructor() {}

  updateSearchTerm(searchTerm: string): void {
    this.searchTerm.next(searchTerm);
  }

  updateCategory(category: number): void {
    this.category.next(category);
  }
}
