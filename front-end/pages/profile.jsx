//profile.jsx
import { useEffect, useState } from "react";
import { Form, Button, Image, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Header from "../app/components/Header";
import styles from "../app/globals.module.css";
import LoadingSpinner from "../app/components/LoadingSpinner";
import "../public/bootstrap.min.css";
import BottomNavBar from "../app/components/Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState("");
  const [userName, setUserName] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("/default-profile.png");

  useEffect(() => {
    const fetchUser = async () => {
      // Replace this with the actual user id
      const userId = localStorage.getItem("userId");
      const userNameFromStorage = localStorage.getItem("userName");
      setUserName(userNameFromStorage);
  
      const goalFromStorage = localStorage.getItem("fitnessGoal");
      if (goalFromStorage) {
        setGoals(goalFromStorage);
      }
  
      try {
        const response = await axios.get(
          `http://localhost:3245/users/${userId}`
        );
        setUser(response.data);
        if (!goalFromStorage) {
          setGoals(response.data.fitnessGoal);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchUser();
  }, []);
  
  const handleGoalsChange = (e) => {
    setGoals(e.target.value);
  };
  
  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    localStorage.setItem("fitnessGoal", goals);
  
    const data = new FormData();
    data.append("image", e.target.image.files[0]);
  
    try {
      const response = await axios.post("http://localhost:3245/upload", data);
      setUploadMessage(response.data.message);
      setImageUrl(response.data.filePath); // Update the image URL
    } catch (error) {
      console.error("Error uploading file:", error);
      if (error.response) {
        setUploadMessage(error.response.data.message);
      } else {
        setUploadMessage("An error occurred while uploading the file");
      }
    }
  };

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <Header />
      <Container className={styles.profileContainer}>
        <h2 className={styles.header2}>Profile</h2>
        <Row>
          <Col md={6} className="text-center">
            <div
              className="card border-info mb-3"
              style={{ maxWidth: "12rem", margin: "auto" }}
            >
              <div className="card-header">{userName}</div>
              <form
                encType="multipart/form-data"
                onSubmit={handleFormSubmit} 
              >
                <input type="file" name="image" />
                <Button variant="primary" type="submit">
                  Change Profile Picture
                </Button>
              </form>
              <Image
                src={imageUrl}
                alt="profile picture"
                roundedCircle
              />
              <p>{uploadMessage}</p>
            </div>
          </Col>
          <Col md={6}>
            <div
              className="card border-info mb-3"
              style={{ maxWidth: "20rem" }}
            >
              <div className="card-header">Your Details</div>
              <div className="card-body">
                <p>
                  <strong>Weight:</strong> {user.weight}kg
                </p>
                <p>
                  <strong>Height:</strong> {user.height}cm
                </p>
                <Form>
                  <Form.Group controlId="goals">
                    <Form.Label>
                      <strong>Goals:</strong>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={goals}
                      onChange={handleGoalsChange}
                    >
                      <option>Gain Muscle</option>
                      <option>Lose Fat</option>
                      <option>Tone Up</option>
                      <option>Improve Mobility</option>
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              className="card border-info mb-3"
              style={{ maxWidth: "30rem" }}
            >
              <div className="card-header">Your Achievements</div>
              <div className="card-body">Coming in future.. </div>
            </div>
          </Col>
        </Row>
        <Button variant="primary" href="/login">
          Logout
        </Button>
      </Container>
      <BottomNavBar />
    </main>
  );
}
