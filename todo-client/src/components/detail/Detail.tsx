import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Todo } from "../../models/todo.model";
import { deleteTodoAsync, getTodosAsync } from "../../redux/todo-slice";
import './Detail.scss';

let item: Todo;

const Detail = () => {
  const [isDeleting, setDeleting] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const nav = useNavigate();
  const list = useSelector((state: { todos: Todo[] }) => state.todos);
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  let elmToDraw = <div>Loading...</div>;

  if (list.length) {
    item = list.filter(todo => todo.id?.toString() === id?.toString())[0] || item;
    const {
      id: todoId,
      title,
      description,
      priority,
      dueDate,
      createdAt,
    } = item;

    if (id?.toString() !== todoId?.toString()) {
      nav('not-found');
    }

    elmToDraw = (
      <>
        <h1 className="display-4">{title}</h1>
        <p className="lead">{description}</p>

        <div className="container container-list">
          <ListGroup className="my-2" horizontal>
            <ListGroup.Item variant="primary">Priority</ListGroup.Item>
            <ListGroup.Item variant="primary">{priority}</ListGroup.Item>
          </ListGroup>

          <ListGroup className="my-2" horizontal>
            <ListGroup.Item variant="warning">Due Date</ListGroup.Item>
            <ListGroup.Item variant="warning">{dueDate.toDateString()}</ListGroup.Item>
          </ListGroup>

          <ListGroup className="my-2" horizontal>
            <ListGroup.Item variant="secondary">Created At</ListGroup.Item>
            <ListGroup.Item variant="secondary">{createdAt?.toDateString()}</ListGroup.Item>
          </ListGroup>
        </div>

        <hr className="my-4" />

        <Button
          variant="danger"
          size="sm"
          disabled={isDeleting}
          onClick={() => {
            setDeleting(true);
            dispatch(deleteTodoAsync({ id: todoId || -1 })).then(() => {
              nav('/todos');
            });
          }}
        >{isDeleting ? 'Deleting...' : 'Delete'}</Button>
      </>
    )
  }

  return (
    <div className="container border badge border-dark mt-80 bg-dark bg-opacity-50 text-start p-4"> {elmToDraw}
    </div>
  )

}

export default Detail;