import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TodoModel } from '../../models/todo.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CreateTodoItem } from '../../store/todo/todo.actions';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  @Output() deleteItem = new EventEmitter<number>();
  @Output() toggleItem = new EventEmitter<number>();
  @Output() editItem = new EventEmitter();
  @Input() todoList: TodoModel[];
  form: FormGroup;
  editIds = [];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {
  }

  get f() {
    return this.form;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl()
    });
  }

  submit() {
    this.store.dispatch(new CreateTodoItem(this.form.value));
    this.form.reset();
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result) {
          this.deleteItem.emit(id);
        }
      });
  }

  edit(values, id: number) {
    this.editIds = this.editIds.filter(itemId => itemId !== id);
    this.editItem.emit({ id, values });
  }

  editMode(id: number) {
    this.editIds.push(id);
  }

  cancel(id: number) {
    this.editIds = this.editIds.filter(itemId => itemId !== id);
  }

  toggle(id: number) {
    this.toggleItem.emit(id);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
