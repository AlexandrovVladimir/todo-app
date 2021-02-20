import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';

import { TodoContainerComponent } from './container/todo-container/todo-container.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoState } from './store/todo/todo.state';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { TodoItemEditComponent } from './components/todo-item-edit/todo-item-edit.component';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [
    TodoContainerComponent,
    TodoListComponent,
    TodoItemComponent,
    DialogComponent,
    TodoItemEditComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    NgxsModule.forFeature([TodoState]),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class TodoModule {
}
