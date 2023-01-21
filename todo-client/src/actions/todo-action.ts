import { Todo } from "../models/todo.model"

export const addTodo = (todo: Todo) => {
  return {
    type: 'ADD_TODO',
    payload: {
      id: new Date().getTime(),
      ...todo,
      createdAt: new Date(),
    }
  }
}

export const deleteTodo = (id: number) => {
  return {
    type: 'DELETE_TODO',
    payload: {
      id
    }
  }
}