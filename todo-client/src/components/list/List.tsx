import { useEffect, useState } from 'react';
import { Card, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../../models/todo.model";
import { getTodosAsync, sortTodosAsync } from "../../redux/todo-slice";
import './List.scss';
import FuzzySearch from 'fuzzy-search';
import type { } from 'redux-thunk/extend-redux'
import Item from '../item/Item';


const searcher = new FuzzySearch<Todo>([], ['title', 'description'], {
  caseSensitive: false,
});

const List = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [isLoadingList, setLoadingList] = useState(true);
  const list = useSelector((state: { todos: Todo[] }) => state.todos);
  useEffect(() => {
    dispatch(getTodosAsync()).then(() => setLoadingList(false));
  }, [dispatch]);

  const getSearchResult = () => {
    searcher.haystack = list;
    return searcher.search(searchText);
  }

  const tableRows = (searchText ? getSearchResult() : list)
    .map(item => <Item detail={item} key={item.id} />);

  let sortBy = 'createdAt';
  let orderBy = 'ASC';

  const sortList = () => {
    dispatch(sortTodosAsync({ sortBy, sortType: orderBy }))
  }

  const listCard = <Card
    bg="dark"
    text='dark'
    className="mb-2 mt-80"
  >
    <Card.Header>
      <div className="sort-wrapper">
        <Form.Control type="text"
          placeholder="search todo"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
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

  const loadingElm = <div className="container border badge border-dark mt-80 bg-dark bg-opacity-50 text-start p-4">
    Loading...
  </div >

  return isLoadingList ? loadingElm : listCard
}

export default List;