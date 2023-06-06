import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchTerm$ = this.searchTerm.asObservable();

  private category: Subject<number> = new Subject<number>();
  public category$ = this.category.asObservable();

  constructor() {}

  updateSearchTerm(searchTerm: string): void {
    this.searchTerm.next(searchTerm);
  }

  updateCategory(category: number): void {
    this.category.next(category);
  }
}
