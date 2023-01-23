import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './home.scss';


const Home = () => {
  const nav = useNavigate();
  return (
    <Card
      bg='dark'
      text='dark'
      className="mb-2 main-card"
    >
      <Card.Body>
        <Card.Title>Go to Todo's list</Card.Title>
        <Card.Text>
          Here you will find all your Todos you have created
        </Card.Text>
        <Card.Footer className="text-center">
          <Button variant="primary" onClick={() => nav('/todos')}>Go to list</Button>
        </Card.Footer>
      </Card.Body>
    </Card>
  )
}

export default Home;