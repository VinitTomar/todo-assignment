import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../../actions/todo-action";
import { Todo, TodoPriority } from "../../models/todo.model";
import './Create.scss';

export default function () {
  const initialTodoFormState: Todo = {
    title: '',
    description: '',
    dueDate: new Date(),
    priority: TodoPriority.HIGH
  }

  const [todoForm, setTodoForm] = useState(initialTodoFormState);

  const submitForm = useDispatch();
  const nav = useNavigate();
  const formatDate = (d: Date) => d.toLocaleDateString().split('/').reverse().join('-');

  return <>
    <Container className="mt-80">
      <Form>
        <Card bg="dark" className="todo-form">
          <Card.Header>
            <Card.Title>Add new todo</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter todo title"
                value={todoForm.title}
                onChange={(event) => setTodoForm({ ...todoForm, title: event.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" placeholder="Explain about your todo"
                value={todoForm.description}
                onChange={(event) => setTodoForm({ ...todoForm, description: event.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dueDate">
              <Form.Label>Due date</Form.Label>
              <Form.Control type="date" placeholder="due date"
                value={formatDate(todoForm.dueDate)}
                onChange={(event) => setTodoForm({ ...todoForm, dueDate: new Date(event.target.value) })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="priority">
              <Form.Label>Priority</Form.Label>
              <br></br>
              {["high", "medium", "low"].map(p => <Form.Check
                label={p}
                inline
                name="priority"
                type="radio"
                className="ml-10"
                id={`priority-${p}`}
                value={p}
                checked={p === todoForm.priority}
                key={`priority-key-${p}`}
                onChange={(event) => setTodoForm({ ...todoForm, priority: event.target.value as TodoPriority })}
              />)}
            </Form.Group>
            <Button variant="success" type="button"
              onClick={() => {
                nav('/');
                submitForm(addTodo(todoForm));
              }}
            >
              Submit
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  </>
}