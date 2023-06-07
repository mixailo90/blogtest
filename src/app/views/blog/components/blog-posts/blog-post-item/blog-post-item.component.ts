import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { format } from 'date-fns';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { BlogPostUpdateRequest } from '../../../../../models/request/blog-post.request';

@Component({
  selector: 'app-blog-post-item',
  templateUrl: './blog-post-item.component.html',
  styleUrls: ['./blog-post-item.component.scss'],
})
export class BlogPostItemComponent implements OnInit {
  @Output() deleteEvent = new EventEmitter<number | null>();
  @Output() editPostEvent = new EventEmitter<BlogPostUpdateRequest>();
  @Input() id = 0;
  @Input() title = '';
  @Input() text = '';
  @Input() categoryId = 0;
  @Input() createdAt: Date = new Date();

  formatDate = '';
  formatTime = '';
  faTrash = faTrash;
  faEdit = faEdit;

  ngOnInit() {
    this.formatDate = format(new Date(this.createdAt), 'yyyy.MM.dd');
    this.formatTime = format(new Date(this.createdAt), 'HH:mm');
  }

  onDeleteEvent(): void {
    this.deleteEvent.emit(this.id);
  }

  onEditPostEvent(): void {
    this.editPostEvent.emit(new BlogPostUpdateRequest(this.id, this.title, this.text, this.categoryId));
  }
}
