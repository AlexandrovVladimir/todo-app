import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TodoState } from '../../store/todo/todo.state';
import { Observable, Subject } from 'rxjs';
import { TodoModel } from '../../models/todo.model';
import { DeleteTodoItem, EditTodoItem, GetTodo, ToggleTodoItem } from '../../store/todo/todo.actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent implements OnInit {
  @Select(TodoState.todoList) todoList$: Observable<TodoModel[]>;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store
  ) {
  }

  ngOnInit(): void {
    const storageState = localStorage.getItem('todo');
    if (storageState) {
      this.store.dispatch(new GetTodo(JSON.parse(storageState)));
    }

    this.todoList$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(todo => {
        localStorage.setItem('todo', JSON.stringify(todo))
      });
  }

  onDelete(id: number) {
    this.store.dispatch(new DeleteTodoItem(id));
  }

  onEdit({id, values}) {
    this.store.dispatch(new EditTodoItem(id, values));
  }

  onToggle(id: number) {
    this.store.dispatch(new ToggleTodoItem(id));
  }
}
