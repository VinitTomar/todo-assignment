import { useEffect } from 'react';
import { Button, Card, Container, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Todo } from "../../models/todo.model";
import { deleteTodoAsync, getTodosAsync, sortTodosAsync } from "../../redux/todo-slice";
import './List.scss';
import type { } from 'redux-thunk/extend-redux'

const List = () => {
  const dispatch = useDispatch();
  const list = useSelector((state: { todos: Todo[] }) => state.todos);
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const tableRows = list.map(({ id, title, priority, dueDate, createdAt }) => {
    return <tr key={id}>
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
        <Button variant="danger" size="sm"
          onClick={() => dispatch(deleteTodoAsync({ id: id || -1 }))}
        >Delete</Button>
      </td>
    </tr >
  });

  let sortBy = 'createdAt';
  let orderBy = 'ASC';

  const sortList = () => {
    dispatch(sortTodosAsync({ sortBy, sortType: orderBy }))
  }

  return (
    <Container className="mt-80">
      <Card
        bg="dark"
        text='dark'
        className="mb-2"
      >
        <Card.Header>
          <div className="sort-wrapper">
            <span className='select-label'>Sort by:</span>
            <Form.Select
              className='text-capitalize'
              value={sortBy}
              onChange={(event) => {
                if (event.target.value) {
                  sortBy = event.target.value;
                  sortList();
                }
              }}
            >
              <option value="createdAt">created date</option>
              <option value="priority">priority</option>
              <option value="dueDate">due date</option>
            </Form.Select>

            <span className='select-label'>Order by:</span>
            <Form.Select className='text-capitalize' onChange={(event) => {
              if (event.target.value) {
                orderBy = event.target.value;
                sortList();
              }
            }}>
              <option value="ASC">ASC</option>
              <option value="DESC">DESC</option>
            </Form.Select>
          </div>
        </Card.Header>
        <Card.Body>
          <Table variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default List;