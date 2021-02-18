import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoModel } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<number>();
  @Output() toggleEvent = new EventEmitter<void>();
  @Input() todo: TodoModel;

  constructor() { }

  ngOnInit(): void {
  }

  delete() {
    this.deleteEvent.emit(this.todo.id);
  }

  edit() {
    this.editEvent.emit(this.todo.id);
  }

  toggle(event: MouseEvent) {
    this.toggleEvent.emit();
  }

  get isExpired() {
    const now = new Date().getTime();
    const expireDate = new Date(this.todo.expireDate.toString()).getTime();
    return (now - expireDate) >= 0;
  }
}
