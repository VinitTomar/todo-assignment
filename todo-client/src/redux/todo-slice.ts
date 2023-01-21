import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Todo } from "../models/todo.model";
import { fetchAllTodo, deleteTodo as deleteTodoApi, sendTodo } from "../services/todo.service";


export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    return fetchAllTodo();
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (todo: Todo) => {
    return sendTodo(todo);
  }
)

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (payload: { id: number }) => {
    return deleteTodoApi(payload.id);
  }
)

export const todoSlice = createSlice({
  name: 'todos',
  initialState: new Array<Todo>(),
  reducers: {
    addTodo: (state, action) => {
      return [...state, action.payload];
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodosAsync.fulfilled.toString()]: (_: any, action: { payload: Todo[]; }) => {
      return action.payload.map(item => {
        item.createdAt = new Date(item?.createdAt?.toString());
        item.dueDate = new Date(item.dueDate.toString());
        return item;
      });
    },
    [addTodoAsync.fulfilled.toString()]: (state: Todo[], action: { payload: Todo }) => {
      const { payload: todo } = action;
      todo.dueDate = new Date(todo.dueDate.toString());
      todo.createdAt = new Date(todo?.createdAt?.toString());
      return [...state, todo];
    },
    [deleteTodoAsync.fulfilled.toString()]: (state: Todo[], action: { payload: { id: number } }) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    }
  }
});

export const { addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;