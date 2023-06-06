import { Component, Input, OnInit } from '@angular/core';
import { format, parse } from 'date-fns';

@Component({
  selector: 'app-blog-post-item',
  templateUrl: './blog-post-item.component.html',
  styleUrls: ['./blog-post-item.component.scss'],
})
export class BlogPostItemComponent implements OnInit {
  @Input() id: number | null = null;
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() createdAt: Date = new Date();
  formatDate: string = '';
  formatTime: string = '';
  ngOnInit() {
    this.formatDate = format(new Date(this.createdAt), 'yyyy.MM.dd');
    this.formatTime = format(new Date(this.createdAt), 'HH:mm');
  }
}
