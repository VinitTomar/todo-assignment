import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTodo } from "../../actions/todo-action";
import { Todo } from "../../models/todo.model";

export default function () {

  const { id } = useParams();
  const nav = useNavigate();

  const list = useSelector(
    (state: { todoReducer: { todos: Todo[]; }; }) => state?.todoReducer.todos
  );

  const dispatchDeleteTodo = useDispatch();

  const {
    id: todoId,
    title,
    description,
    priority,
    dueDate,
    createdAt,
  } = list.filter(todo => todo.id == id)[0];

  return (
    <div>
      <h2>Title</h2>
      <p>{title}</p>
      <h2>Description</h2>
      <p>{description}</p>
      <h2>Priority</h2>
      <p>{priority}</p>
      <h2>Due date</h2>
      <p>{dueDate.toString()}</p>
      <h2>Created At</h2>
      <p>{createdAt?.toString()}</p>

      <Button variant="danger" size="sm"
        onClick={() => {
          dispatchDeleteTodo(deleteTodo(todoId || -1));
          nav('/');
        }}
      >Delete</Button>
    </div>
  )
}