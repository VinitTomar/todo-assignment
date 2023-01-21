import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTodo } from "../../actions/todo-action";
import { Todo } from "../../models/todo.model";
import './List.scss';

export default function () {

  const list = useSelector(
    (state: { todoReducer: { todos: Todo[]; }; }) => state?.todoReducer.todos
  )

  const dispatchDeleteTodo = useDispatch();

  const tableRows = list.map(({ id, title, description, dueDate, createdAt }) => {
    return <tr key={id}>
      <td>{id}</td>
      <td>
        <Link to={`/todos/${id}`}>
          <Button variant="link">{title}</Button>
        </Link>
      </td>
      <td>{description}</td>
      <td>{dueDate.toDateString()}</td>
      <td>{createdAt?.toDateString()}</td>
      <td><Button variant="danger" size="sm"
        onClick={() => dispatchDeleteTodo(deleteTodo(id || -1))}
      >Delete</Button></td>
    </tr >
  });

  return (
    <Container className="mt-80">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Created At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </Table>
    </Container>
  )
}