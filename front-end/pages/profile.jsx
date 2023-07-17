import { useEffect, useState } from 'react';
import { Form, Button, Image, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Header from '../app/components/Header';
import styles from '../app/globals.module.css';
import LoadingSpinner from '../app/components/LoadingSpinner';
import '../public/bootstrap.min.css';
import BottomNavBar from '../app/components/Navbar';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      // Replace this with the actual user id
      const userId = localStorage.getItem('userId');

      try {
        const response = await axios.get(`http://localhost:3245/users/${userId}`);
        setUser(response.data);
        setGoals(response.data.fitnessGoal);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleGoalsChange = (e) => {
    setGoals(e.target.value);
  };

  if (!user) {
    return <LoadingSpinner/>;
  }

  return (
    <main>
      <Header />
      <Container className={styles.profileContainer}>
        <Row>
          <Col md={4}>
            <Image src="/default-profile.png" alt="default profile picture" roundedCircle />
            <h2>{user.name}</h2>
          </Col>
          <Col md={8}>
            <h2>Your Details</h2>
            <p><strong>Weight:</strong> {user.weight}kg</p>
            <p><strong>Height:</strong> {user.height}cm</p>
            <Form>
              <Form.Group controlId="goals">
                <Form.Label><strong>Goals:</strong></Form.Label>
                <Form.Control as="select" value={goals} onChange={handleGoalsChange}>
                  <option>Lose Weight</option>
                  <option>Gain Muscle</option>
                  <option>Improve Cardio</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <h2>Your Achievements</h2>
          {/* Display user's achievements here */}
        </Row>
      </Container>
      <BottomNavBar/>
    </main>
  );
}
