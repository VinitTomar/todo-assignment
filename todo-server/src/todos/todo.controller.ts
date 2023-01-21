import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { TodoCreate, TodoCreateDto, TodoSortBy, TodoSortType } from './todo.model';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {

  constructor(
    private readonly _service: TodoService
  ) { }

  @Get()
  findAll(
    @Query('sortBy') sortBy: TodoSortBy,
    @Query('sortType') sortType: TodoSortType
  ) {
    return this._service.getAllTodos(
      sortBy || 'createdAt',
      sortType || 'ASC'
    );
  }

  @Get(':id')
  findById(@Param('id') todoId: string) {
    return this._service.getTodoById(todoId);
  }

  @Post()
  addTodo(@Body() todo: TodoCreateDto) {
    return this._service.createTodo(todo as TodoCreate);
  }

  @Delete(':id')
  deleteTodo(@Param('id') todoId: string) {
    return this._service.deleteTodo(todoId);
  }

}