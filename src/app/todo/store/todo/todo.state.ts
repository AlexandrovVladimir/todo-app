import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';

import {
  CreateTodoItem,
  DeleteTodoItem,
  EditTodoItem,
  GetTodo,
  ToggleCompletedTodoItem, ToggleFavouriteTodoItem,
} from './todo.actions';
import { TodoModel } from '../../models/todo.model';
import { v4 as uniqId } from 'uuid';

export interface TodoStateModel {
  idIncrement: number,
  todoList: TodoModel[];
}

@State<TodoStateModel>({
  name: 'TodoState',
  defaults: {
    idIncrement: uniqId(),
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
      idIncrement: uniqId(),
      todoList: [
        ...state.todoList,
        {
          id: state.idIncrement,
          name: payload.name,
          description: payload.description,
          completed: false,
          createdAt: new Date(),
          expireDate: new Date(new Date().setDate(new Date().getDate() + 1)),
          favourite: false
        }
      ]
    });
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

  @Action(ToggleCompletedTodoItem)
  toggleCompletedTodoItem({ getState, setState }: StateContext<TodoStateModel>, { id }: ToggleCompletedTodoItem) {
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

  @Action(ToggleFavouriteTodoItem)
  toggleFavouriteTodoItem({ getState, setState }: StateContext<TodoStateModel>, { id }: ToggleFavouriteTodoItem) {
    const state = getState();
    setState({
      ...state,
      todoList: state.todoList.map(todo => todo.id === id ? {
        ...todo,
        favourite: !todo.favourite,
      } : todo)
    });
  }
}
