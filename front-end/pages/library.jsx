
import { useEffect, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import axios from "axios";
import YouTube from "react-youtube";
import Header from "../app/components/Header";
import BottomNavBar from "../app/components/Navbar";

import "../public/bootstrap.min.css";
import "../app/globals.module.css"; 

function LibraryPage() {
  const [exercises, setExercises] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  const openModal = (exercise) => {
    setShowModal(true);
    setCurrentExercise(exercise);
    // Search for a demonstration video
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${exercise.name}%20exercise%20howto%20demonstration&key=YOUR_API_KEY`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          if (data.items.length > 0) {
            setCurrentVideo(data.items[0].id.videoId);
          }
        } else {
          console.error("No items found in data:", data);
        }
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentExercise(null);
    setCurrentVideo(null);
  };

  const opts = {
    height: "300px",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    axios
      .get("https://api.api-ninjas.com/v1/exercises", {
        headers: {
          "X-Api-Key": "VPInujgC7uxthV//ZJVY4g==01tRgS7nO7Xsk04W",
        },
      })
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exercises:", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <h2>Exercise Library</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {exercises.map((exercise, i) => (
          <Card style={{ width: "18rem" }} key={i}>
            <Card.Body>
              <Card.Title>{exercise.name}</Card.Title>
              <Card.Text>Type: {exercise.type}</Card.Text>
              <Card.Text>Difficulty: {exercise.difficulty}</Card.Text>
              <Card.Text>Equipment: {exercise.equipment}</Card.Text>
              <Button variant="primary" onClick={() => openModal(exercise)}>
                View Demonstration
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentExercise && currentExercise.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentVideo && <YouTube videoId={currentVideo} opts={opts} />}
          <p>{currentExercise && currentExercise.instructions}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <BottomNavBar />
    </div>
  );
}

export default LibraryPage;
