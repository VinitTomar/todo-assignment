import { Todo, TodoPriority } from "../models/todo.model";

const initialState: {
  todos: Todo[]
} = {
  todos: [{
    id: 1,
    title: 'list 1',
    description: 'list one description',
    priority: TodoPriority.LOW,
    dueDate: new Date('2023-01-11'),
  },
  {
    id: 2,
    title: 'list 2',
    description: 'list two description',
    priority: TodoPriority.LOW,
    dueDate: new Date('2023-02-12'),
  },
  {
    id: 3,
    title: 'list 3',
    description: 'list three description',
    priority: TodoPriority.LOW,
    dueDate: new Date('2023-03-13'),
  },]
}

export default (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          action.payload
        ]
      }

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo: Todo) => todo.id !== action.payload.id)
      }

    default:
      return state;
  }
}