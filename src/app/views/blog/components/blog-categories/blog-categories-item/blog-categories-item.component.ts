import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-blog-categories-item',
  templateUrl: './blog-categories-item.component.html',
  styleUrls: ['./blog-categories-item.component.scss'],
})
export class BlogCategoriesItemComponent {
  @Output() deleteEvent = new EventEmitter<number | null>();
  @Input() name: string = '';
  @Input() id: number | null = null;
  isHovered = false;
  faTrash = faTrash;

  onDeleteCategory(): void {
    this.deleteEvent.emit(this.id);
  }
}
