//pages/setGoals.jsx

import { useRouter } from "next/router";
import Header from "../app/components/Header";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "../app/globals.module.css";
import "../public/bootstrap.min.css";
import "../app/globals.css";


const goals = [
  {
    image: "/musclegain.jpg",
    name: "Muscle Gain",
    description: "Build muscle and increase strength.",
  },
  {
    image: "/fatloss.jpg",
    name: "Fat Loss",
    description: "Burn fat and increase your metabolism.",
  },
  {
    image: "/toneup.jpg",
    name: "Tone up",
    description: "Define muscles and increase endurance.",
  },
  {
    image: "/mobility.jpg",
    name: "Mobility",
    description: "Increase flexibility and joint health.",
  },
];

function FitnessGoalsPage() {
  const router = useRouter();

  const handleGoalClick = (goal) => {
    // Save goal to local storage
    localStorage.setItem("fitnessGoal", goal.name);

    router.push("/fitnessLevel");
  };

  return (
    <div>
      <Header />
      <Container className={styles.fitnessGoalsContainer}>
        <h2 className={styles.header2}>Select Your Fitness Goal</h2>
        <Row>
          {goals.map((goal, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <Card
                className={`card text-white bg-primary mb-3 ${styles.goalCard}`}
                onClick={() => handleGoalClick(goal)}
              >
                <Card.Img
                  variant="top"
                  src={goal.image}
                  className={styles.goalImage}
                />
                <Card.Body>
                  <Card.Title>{goal.name}</Card.Title>
                  <Card.Text className={styles.goalDescription}>
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
