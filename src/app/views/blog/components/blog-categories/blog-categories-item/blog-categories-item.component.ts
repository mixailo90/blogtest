import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-blog-categories-item',
  templateUrl: './blog-categories-item.component.html',
  styleUrls: ['./blog-categories-item.component.scss'],
})
export class BlogCategoriesItemComponent implements OnChanges, OnInit {
  @Output() deleteEvent = new EventEmitter<{ id: number | null; event: MouseEvent }>();
  @Output() clickCategory = new EventEmitter<number | null>();
  @Input() name = '';
  @Input() id: number | null = null;
  @Input() activeId = -1;

  isHovered = false;
  isActive = false;
  faTrash = faTrash;

  onDeleteCategory(event: MouseEvent): void {
    this.deleteEvent.emit({ id: this.id, event });
  }

  onClickCategory(): void {
    this.clickCategory.emit(this.id);
  }
  ngOnInit() {
    this.isActive = this.activeId === this.id;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeId']) {
      this.isActive = changes['activeId'].currentValue === this.id;
    }
  }
}
