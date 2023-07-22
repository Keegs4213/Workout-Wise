import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Dropdown,
  InputGroup,
  FormControl,
  Pagination,
} from "react-bootstrap";
import LoadingSpinner from "../app/components/LoadingSpinner";
import axios from "axios";
import YouTube from "react-youtube";
import Header from "../app/components/Header";
import BottomNavBar from "../app/components/Navbar";

import "../public/bootstrap.min.css";
import styles from "../app/globals.module.css";

function LibraryPage() {
  const [exercises, setExercises] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [muscleFilter, setMuscleFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const recordsPerPage = 8;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const filters = {
    type: ["Cardio", "Strength", "Stretching"],
    muscle: [
      "Abdominals",
      "Biceps",
      "Triceps",
      "Lats",
      "Middle_Back",
      "Chest",
      "Quadriceps",
      "Glutes",
      "Hamstrings",
    ],
    difficulty: ["Beginner", "Intermediate", "Expert"],
  };

  // Fetch exercises whenever page, searchTerm, typeFilter, muscleFilter, or difficultyFilter changes
  useEffect(() => {
    fetchExercises(page);
  }, [page, searchTerm, typeFilter, muscleFilter, difficultyFilter]);

  const openModal = (exercise) => {
    setShowModal(true);
    setCurrentExercise(exercise);
    // Search for a demonstration video
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${exercise.name}%20exercise%20howto%20demonstration&key=AIzaSyAn_AA9nU7HiOJ3K_2f2MYVDyOSThFGTkU`
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

  const opts = {
    height: "300px",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentExercise(null);
    setCurrentVideo(null);
  };

  const fetchExercises = () => {
    const offset = (page - 1) * recordsPerPage;
    axios
      .get(
        `https://api.api-ninjas.com/v1/exercises?offset=${offset}&name=${searchTerm}&type=${typeFilter}&muscle=${muscleFilter}&difficulty=${difficultyFilter}`,
        {
          headers: {
            "X-Api-Key": "VPInujgC7uxthV//ZJVY4g==01tRgS7nO7Xsk04W",
          },
        }
      )
      .then((response) => {
        const limitedExercises = response.data.slice(0, recordsPerPage);
        setExercises(limitedExercises);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching exercises:", error);
        setIsLoading(false); });
 
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      fetchExercises(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
    fetchExercises(page + 1);
  };

  return (
    <div>
      <Header/>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2 className={styles.header2}>Exercise Library</h2>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search exercises"
              aria-label="Search exercises"
              aria-describedby="basic-addon2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Row style={{ justifyContent: "flex-start", margin: "10px" }}>
  <Col xs={12} sm={4}>
    <Dropdown onSelect={(value) => setTypeFilter(value)}>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {typeFilter || "Select Type"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="">Select Type</Dropdown.Item>
                  {filters.type.map((type, i) => (
                    <Dropdown.Item eventKey={type} key={i}>
                      {type}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col xs={12} sm={4}>
    <Dropdown onSelect={(value) => setMuscleFilter(value)}>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {muscleFilter || "Select Muscle"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="">Select Muscle</Dropdown.Item>
                  {filters.muscle.map((muscle, i) => (
                    <Dropdown.Item eventKey={muscle} key={i}>
                      {muscle}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col xs={12} sm={4}>
    <Dropdown onSelect={(value) => setDifficultyFilter(value)} >
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {difficultyFilter || "Select Difficulty"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="">Select Difficulty</Dropdown.Item>
                  {filters.difficulty.map((difficulty, i) => (
                    <Dropdown.Item eventKey={difficulty} key={i}>
                      {difficulty}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {exercises.map((exercise, i) => (
            <Card
            className="card border-light mb-3"
            style={{ width: "300px", height: "235px" }} // Adjusted width and height
            key={i}
          >
            <Card.Body className={styles.dashboardText} style={{ fontSize: "1em" }}>
              <Card.Title style={{ fontSize: "1.3em" }}>{exercise.name}</Card.Title>
              <Card.Text >
                Type: {capitalizeFirstLetter(exercise.type.replace(/_/g, " "))}
              </Card.Text>
              <Card.Text >
                Difficulty: {capitalizeFirstLetter(exercise.difficulty)}
              </Card.Text>
              <Card.Text >
                Equipment: {capitalizeFirstLetter(exercise.equipment.replace(/_/g, " "))}
              </Card.Text>
              <Button variant="primary" style={{ fontSize: ".8em" }} onClick={() => openModal(exercise)}>
                View Demonstration
              </Button>
            </Card.Body>
          </Card>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "60px",
            }}
          >
            <Pagination>
              <Pagination.Prev onClick={handlePrevPage} disabled={page === 1} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={handleNextPage} />
            </Pagination>
          </div>
          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {currentExercise && currentExercise.name}
              </Modal.Title>
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
        </>
      )}
    </div>
  );
}
export default LibraryPage;
