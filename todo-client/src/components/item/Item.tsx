import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Todo } from "../../models/todo.model";
import { deleteTodoAsync } from "../../redux/todo-slice";


const Item = ({ detail: { id, title, priority, dueDate, createdAt } }: { detail: Todo }) => {
  const dispatch = useDispatch();
  const [isDeleting, setDeleting] = useState(false);

  return <tr>
    <td>{id}</td>
    <td>
      <Link to={`/todos/${id}`}>
        <Button variant="link">{title}</Button>
      </Link>
    </td>
    <td className="text-capitalize">{priority}</td>
    <td>{dueDate.toDateString()}</td>
    <td>{createdAt?.toDateString()}</td>
    <td>
      <Button
        variant="danger"
        size="sm"
        disabled={isDeleting}
        onClick={() => {
          setDeleting(true);
          dispatch(deleteTodoAsync({ id: id || -1 }));
        }}
      >{isDeleting ? 'Deleting...' : 'Delete'}</Button>
    </td>
  </tr >
}

export default Item;