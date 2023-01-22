import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TodoPriority } from "../../models/todo.model";
import { addTodoAsync } from "../../redux/todo-slice";
import * as yup from 'yup';
import { Formik } from 'formik';
import './Create.scss';

const schema = yup.object().shape({
  title: yup.string().required().min(3).max(50),
  description: yup.string().required().min(5).max(255),
  dueDate: yup.date().required().test('minDueDate', 'Due should be after today',
    (value) => {
      const due = new Date(value?.toString() || '').getTime();
      const now = new Date().getTime();
      return due > now;
    }
  ),
});

const initialTodoFormState = {
  title: '',
  description: '',
  dueDate: '',
  priority: TodoPriority.HIGH
}

const Create = () => {
  const submitForm = useDispatch();
  const nav = useNavigate();

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(data) => {
        console.log({ data })
        submitForm(addTodoAsync({
          ...data,
          dueDate: new Date(data.dueDate)
        }));
        nav('/');
      }}
      initialValues={initialTodoFormState}>
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
      }) => (
        <Container className="mt-80">
          <Form noValidate onSubmit={handleSubmit}>
            <Card bg="dark" className="todo-form">
              <Card.Header>
                <Card.Title>Add new todo</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter todo title"
                    value={values.title}
                    onChange={handleChange}
                    name="title"
                    isInvalid={touched.title && !!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Explain about your todo"
                    value={values.description}
                    onChange={handleChange}
                    name="description"
                    isInvalid={touched.description && !!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="dueDate">
                  <Form.Label>Due date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="due date"
                    value={values.dueDate}
                    onChange={handleChange}
                    name="dueDate"
                    isInvalid={touched.dueDate && !!errors.dueDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dueDate}
                  </Form.Control.Feedback>
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
                    checked={p === values.priority}
                    key={`priority-key-${p}`}
                    onChange={handleChange}
                  />)}
                </Form.Group>
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Card.Body>
            </Card>
          </Form>
        </Container>
      )}
    </Formik>
  );
}

export default Create;