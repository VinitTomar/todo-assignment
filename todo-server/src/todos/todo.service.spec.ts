import { getModelToken } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { MockType } from "../global";
import { Todo, TodoPriority } from "./todo.model";
import { TodoService } from "./todo.service";

describe('TodoService', () => {
  let service: TodoService;
  let model: typeof Todo;

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

  const todoModelMockFactory: () => MockType<typeof Todo> = jest.fn(() => ({
    findAll: jest.fn().mockResolvedValue(dummyTodos),
    findOne: jest.fn().mockResolvedValue(dummyTodos[0]),
    create: jest.fn((todo) => {
      return { id: 'some id', ...todo, createdAt: new Date() }
    }),
    destroy: jest.fn(({ where }) => where.id),
  }))

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken(Todo),
          useFactory: todoModelMockFactory
        }],
    }).compile();

    service = module.get<TodoService>(TodoService);
    model = module.get<typeof Todo>(getModelToken(Todo));
  });

  it('should define', () => {
    expect(service).toBeDefined();
  });

  it('should get all todos', async () => {
    const todos = await service.getAllTodos('createdAt', 'ASC');
    const spy = jest.spyOn(model, 'findAll');

    expect(spy).toHaveBeenCalledWith({ order: [["createdAt", "ASC"]] });
    expect(todos).toBe(dummyTodos);
  });

  it('should get todo with id 1', async () => {
    const id = '1';
    const todo = await service.getTodoById(id);
    const spy = jest.spyOn(model, 'findOne');

    expect(spy).toHaveBeenCalledWith({
      where: {
        id
      }
    });
    expect(todo).toEqual(dummyTodos[0]);
  });

  it('should create todo', async () => {
    const createTodo: any = {
      title: 'test',
      description: 'test todo description',
      dueDate: new Date('2023-06-11'),
      priority: TodoPriority.HIGH
    };

    const todo = await service.createTodo(createTodo);
    const spy = jest.spyOn(model, 'create');

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      ...createTodo,
      createdAt: expect.any(Date)
    }));

    expect(todo).toEqual(expect.objectContaining({
      id: expect.stringMatching('some id'),
      createdAt: expect.any(Date)
    }));
  });

  it('should delete todo', async () => {
    const id = 'some id';
    const todoId = await service.deleteTodo(id);
    const spy = jest.spyOn(model, 'destroy');

    expect(spy).toHaveBeenCalledWith({ where: { id } });
    expect(todoId).toEqual(id);
  });
});