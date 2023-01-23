import { Test, TestingModule } from '@nestjs/testing';
import { MockType } from '../global';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;
  let dummyTodos = Object.freeze([
    {
      id: 1,
      title: 'Todo 1',
      decription: 'Description todo 1',
      dueDate: new Date('2024-01-11'),
      priority: 'low',
      createdAt: new Date()
    },
    {
      id: 2,
      title: 'Todo 2',
      decription: 'Description todo 2',
      dueDate: new Date('2024-01-12'),
      priority: 'low',
      createdAt: new Date()
    },
  ]);

  let todoServiceMockFactory: () => MockType<TodoService> = jest.fn(() => ({
    getAllTodos: jest.fn(() => {
      return dummyTodos
    }),

    getTodoById: jest.fn((id) => {
      return dummyTodos.filter(todo => todo.id == id)[0];
    }),

    createTodo: jest.fn((todo) => {
      return { id: 'some id', ...todo, createdAt: new Date() }
    }),

    deleteTodo: jest.fn(() => 'some id')
  }))


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [{
        provide: TodoService,
        useFactory: todoServiceMockFactory
      }],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return all todos', async () => {
      const todos = await controller.findAll('createdAt', 'ASC');
      expect(todos).toBe(dummyTodos);
    });

    it('should return todo with id 1', async () => {
      const todo = await controller.findById('1');
      expect(todo).toBe(dummyTodos[0]);
    });

    it('should create todo', async () => {
      const createTodo: any = {
        title: 'test',
        decription: 'test todo description',
        dueDate: new Date('2023-06-11'),
        priority: 'high'
      };

      const spy = jest.spyOn(service, 'createTodo');

      const todo = await controller.addTodo(createTodo);

      expect(spy).toHaveBeenCalledWith(createTodo);
      expect(todo).toEqual(expect.objectContaining({
        id: expect.stringMatching('some id'),
        createdAt: expect.any(Date)
      }));
    });

    it('should delete todo', async () => {
      const spy = jest.spyOn(service, 'deleteTodo');
      const todoId = await service.deleteTodo('some id');

      expect(spy).toHaveBeenCalledWith('some id');
      expect(todoId).toEqual('some id');
    });
  });
});
