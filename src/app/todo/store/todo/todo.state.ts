import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';

import { CreateTodoItem, DeleteTodoItem, EditTodoItem, GetTodo, ToggleTodoItem } from './todo.actions';
import { TodoModel } from '../../models/todo.model';

export interface TodoStateModel {
  idIncrement: number,
  todoList: TodoModel[];
}

@State<TodoStateModel>({
  name: 'TodoState',
  defaults: {
    idIncrement: 1,
    todoList: []
  }
})
@Injectable()
export class TodoState {
  @Selector()
  static todoList(state: TodoStateModel): TodoModel[] {
    return state.todoList;
  }

  @Action(GetTodo)
  getTodo({ getState, setState }: StateContext<TodoStateModel>, { todoList }: GetTodo) {
    const state = getState();
    setState({
      ...state,
      todoList: todoList
    });
  }

  @Action(CreateTodoItem)
  createTodoItem({ getState, setState }: StateContext<TodoStateModel>, { payload }: CreateTodoItem) {
    const state = getState();
    setState({
      ...state,
      idIncrement: state.idIncrement + 1,
      todoList: [
        ...state.todoList,
        {
          id: state.idIncrement,
          name: payload.name,
          description: payload.description,
          completed: false,
          createdAt: new Date(),
          expireDate: new Date(new Date().setDate(new Date().getDate() + 1))
        }
      ]
    })
  }

  @Action(DeleteTodoItem)
  deleteTodoItem({ getState, setState }: StateContext<TodoStateModel>, { id }: DeleteTodoItem) {
    const state = getState();
    setState({
      ...state,
      todoList: state.todoList.filter(todo => todo.id !== id)
    })
  }

  @Action(EditTodoItem)
  editTodoItem({ getState, setState }: StateContext<TodoStateModel>, { id, payload }: EditTodoItem) {
    const state = getState();
    setState({
      ...state,
      todoList: state.todoList.map(todo => todo.id === id ? {
        ...todo,
        name: payload.name,
        description: payload.description
      } : todo)
    });
  }

  @Action(ToggleTodoItem)
  toggleTodoItem({ getState, setState }: StateContext<TodoStateModel>, { id }: ToggleTodoItem) {
    const state = getState();
    setState({
      ...state,
      todoList: state.todoList.map(todo => todo.id === id ? {
        ...todo,
        completed: !todo.completed,
        completedAt: !todo.completed ? new Date() : null
      } : todo)
    });
  }
}
