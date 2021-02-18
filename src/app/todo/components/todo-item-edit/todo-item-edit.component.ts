import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoModel } from '../../models/todo.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-item-edit',
  templateUrl: './todo-item-edit.component.html',
  styleUrls: ['./todo-item-edit.component.scss']
})
export class TodoItemEditComponent implements OnInit {
  @Output() editEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter<void>();
  @Input() todo: TodoModel;
  editForm: FormGroup;

  constructor() { }

  get f() {
    return this.editForm;
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      name: new FormControl(this.todo.name, Validators.required),
      description: new FormControl(this.todo.description)
    })
  }

  submit() {
    this.editEvent.emit(this.f.value);
  }

  cancel() {
    this.cancelEvent.emit();
  }
}
