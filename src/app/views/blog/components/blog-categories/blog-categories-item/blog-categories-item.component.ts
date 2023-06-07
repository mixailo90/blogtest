import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-blog-categories-item',
  templateUrl: './blog-categories-item.component.html',
  styleUrls: ['./blog-categories-item.component.scss'],
})
export class BlogCategoriesItemComponent {
  @Output() deleteEvent = new EventEmitter<{ id: number | null; event: MouseEvent }>();
  @Output() clickCategory = new EventEmitter<number | null>();
  @Input() name = '';
  @Input() id: number | null = null;
  isHovered = false;
  faTrash = faTrash;

  onDeleteCategory(): void {
    const event = new MouseEvent('click');
    this.deleteEvent.emit({ id: this.id, event });
  }
  onClickCategory(): void {
    this.clickCategory.emit(this.id);
  }
}
