import { Todo } from "../models/todo.model";

const baseUrl = 'http://localhost:3500/todos';

export const fetchAllTodo = () => {
  return fetch(baseUrl)
    .then(res => res.json());
}

export const sendTodo = (todo: Todo) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(todo),
  }).then(res => res.json());
}

export const deleteTodo = (id: number) => {
  return fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
    .then(res => {
      if (res.ok) {
        return { id }
      }
    })
}