import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo, TodoCreate, TodoSortBy, TodoSortType } from './todo.model';

@Injectable()
export class TodoService {

  constructor(
    @InjectModel(Todo)
    private _todoModel: typeof Todo
  ) { }

  getAllTodos(
    sortBy: TodoSortBy,
    sortType: TodoSortType
  ): Promise<Todo[]> {
    return this._todoModel.findAll({
      order: [[sortBy, sortType]]
    });
  }

  getTodoById(id: string): Promise<Todo> {
    return this._todoModel.findOne({
      where: {
        id
      }
    });
  }

  createTodo(todo: TodoCreate): Promise<Todo> {
    todo.createdAt = new Date();
    return this._todoModel.create(todo);
  }

}
