// pages/fitnessLevel.jsx

import { useRouter } from "next/router";
import Header from "../app/components/Header";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "../app/globals.module.css";
import "../public/bootstrap.min.css";
import axios from "axios";

const levels = [
  {
    image: "/beginner.jpg",
    name: "Beginner",
    description: "You exercise infrequently and don't have much experience.",
  },
  {
    image: "/intermediate.jpg",
    name: "Intermediate",
    description: "You exercise semi-regularly and have some experience.",
  },
  {
    image: "/advanced.jpg",
    name: "Expert",
    description: "You exercise regularly and have years of experience.",
  },
];

function FitnessLevelPage() {
  const router = useRouter();

  const handleLevelClick = async (level) => {
    // Get user ID and goal from local storage
    const userId = localStorage.getItem("userId");
    const fitnessGoal = localStorage.getItem("fitnessGoal");

    // Check if the userId is valid
    if (!userId) {
      console.error("No userId found in localStorage");
      return;
    }

    // Send a request to update the user's data
    try {
      const response = await axios.put(
        `http://localhost:3245/users/update/${userId}`,
        {
          fitnessGoal,
          fitnessLevel: level.name,
        }
      );

      // Save workout and nutrition plans to local storage
      localStorage.setItem(
        "workoutPlan",
        JSON.stringify(response.data.workoutPlan)
      );
      localStorage.setItem(
        "nutritionPlan",
        JSON.stringify(response.data.nutritionPlan)
      );

      // Save fitness level to local storage
      localStorage.setItem("fitnessLevel", level.name);

      router.push("/generatePlan");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div>
      <Header />
      <Container className={styles.fitnessLevelContainer}>
        <h2 className={styles.header2}>What is your fitness experience level?</h2>
        <Row>
          {levels.map((level, index) => (
            <Col key={index} sm={12} md={4} lg={4}>
              <Card
                onClick={() => handleLevelClick(level)}
                className={`card text-white bg-primary mb-3 ${styles.levelCard}`}
              >
                <Card.Img variant="top" src={level.image} />
                <Card.Body>
                  <Card.Title>{level.name}</Card.Title>
                  <Card.Text>{level.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default FitnessLevelPage;
