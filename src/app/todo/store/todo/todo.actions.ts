import { TodoModel } from '../../models/todo.model';

export class GetTodo {
  static readonly type = '[Todo] Get Todo List';

  constructor(public todoList: TodoModel[]) {
  }
}

export class CreateTodoItem {
  static readonly type = '[Todo] Create Todo Item';

  constructor(public payload: TodoModel) {
  }
}

export class DeleteTodoItem {
  static readonly type = '[Todo] Delete Todo Item';

  constructor(public id: number) {
  }
}

export class EditTodoItem {
  static readonly type = '[Todo] Edit Todo Item';

  constructor(public id: number, public payload: { name: string, description: string }) {
  }
}

export class ToggleTodoItem {
  static readonly type = '[Todo] Toggle Todo Item';

  constructor(public id: number) {
  }
}
