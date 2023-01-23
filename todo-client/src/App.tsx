import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import './App.scss';
import Create from './components/create/Create';
import DetailsPage from './components/detail/Detail';
import Home from './components/home/home';
import List from './components/list/List';

function App() {
  document.title = 'Todo list';
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Container>
            <Navbar expand="lg" variant="dark" bg="dark">
              <Container>
                <Navbar.Brand>
                  <Link to="/">Todo App</Link>
                </Navbar.Brand>
                <Nav>
                  <Nav.Item className="justify-content-end">
                    <Link to="/todos/create">
                      <Button variant="primary">New</Button>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Container>
            </Navbar>
            <Outlet />
          </Container>}>
            <Route index element={<Home />} />
            <Route path="todos" element={<List />} />
            <Route path="todos/create" element={<Create />} />
            <Route path="todos/:id" element={<DetailsPage />} />
            <Route path="*" element={<div> Not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
