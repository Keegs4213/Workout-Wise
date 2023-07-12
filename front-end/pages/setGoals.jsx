//pages/setGoals.jsx

import { useRouter } from 'next/router';
import Header from "../app/components/Header";
import { Card, Container, Row, Col } from 'react-bootstrap';
import styles from '../app/globals.module.css';
import "../public/bootstrap.min.css";

const goals = [
  {
    image: "/musclegain.jpg",
    name: "Muscle Gain"
  },
  {
    image: "/fatloss.jpg",
    name: "Fat Loss"
  },
  {
    image: "/toneup.jpg",
    name: "Tone up"
  },
  {
    image: "/mobility.jpg",
    name: "Mobility"
  },
];

function FitnessGoalsPage() {
  const router = useRouter();

  const handleGoalClick = (goal) => {
    // Save goal to local storage
    localStorage.setItem("fitnessGoal", goal.name);
  
    router.push('/fitnessLevel');
  };

return (
  <div>
    <Header />
    <Container className={styles.fitnessGoalsContainer}>
      <h2>Select Your Fitness Goal</h2>
      <Row>
     {goals.map((goal, index) => (
   <Col key={index} sm={12} md={6} lg={6}>
   <Card className={`card text-white bg-primary mb-3 ${styles.goalCard}`} onClick={() => handleGoalClick(goal)}>
     <Card.Img variant="top" src={goal.image} className={styles.goalImage} />
     <Card.Body>
       <Card.Title>{goal.name}</Card.Title>
       <Card.Text>
         {goal.description}
       </Card.Text>
     </Card.Body>
   </Card>
 </Col>
))}
      </Row>
    </Container>
  </div>
);
}

export default FitnessGoalsPage;
