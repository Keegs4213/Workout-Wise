import { useEffect, useState } from "react";
import { Form, Button, Image, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Header from "../app/components/Header";
import styles from "../app/globals.module.css";
import LoadingSpinner from "../app/components/LoadingSpinner";
import "../public/bootstrap.min.css";
import BottomNavBar from "../app/components/Navbar";
import "../app/globals.css";
import { set } from 'mongoose'

export default function Profile() {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState("");
  const [userName, setUserName] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("/default-profile.png");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      const userNameFromStorage = localStorage.getItem("userName");
      setUserName(userNameFromStorage);

      try {
        const response = await axios.get(
          `${API_URL}/users/${userId}`
          )
          console.log(response?.data.data, 'RESPONSE DATA')
          setUser(response?.data.data)
          setGoals(response?.data?.fitnessGoal)
          setWeight(response?.data?.data?.weight)
          setHeight(response?.data?.data?.height)

        
        if (response.data.profileImageUrl) {
          setImageUrl(response.data.profileImageUrl);
        } else {
          setImageUrl("/default-profile.png");
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

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API_URL}/users/update/${user._id}`,
        {
          weight: weight,
          height: height,
          fitnessGoal: goals,
        }
      )
      console.log(response.data.data, 'resDATA')
      setUser(response.data.data)
      setUploadMessage('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
      setUploadMessage('An error occurred while updating the profile')
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", e.target.image.files[0]);
    data.append("userId", user._id);

    try {
      const response = await axios.post(`${API_URL}/upload`, data);

      console.log("Response:", response.data);
      setUploadMessage(response.data.message);
      setImageUrl(response.data.filePath);
    } catch (error) {
      console.error("Error uploading file:", error);
      if (error.response) {
        setUploadMessage(error.response.data.message);
      } else {
        setUploadMessage("An error occurred while uploading the file");
      }
    }
  };

  const handleFileChange = (e) => {
    const fileLabel = document.getElementById("file-upload-label");
    if (e.target.files.length > 0) {
      fileLabel.textContent = e.target.files[0].name;
    } else {
      fileLabel.textContent = "No file chosen";
    }
  };

  const handleFileButtonClick = (e) => {
    const fileInput = document.getElementById("file-upload");
    fileInput.click();
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
              <Image src={imageUrl} alt="profile picture" roundedCircle />
              <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
                <br></br>
                <label
                  style={{ display: "none" }}
                  id="file-upload-label"
                  htmlFor="file-upload"
                >
                  No file chosen
                </label>
                <input
                  id="file-upload"
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Button variant="secondary" onClick={handleFileButtonClick}>
                  Choose File
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className={styles.profileButton}
                >
                  Change Profile Picture
                </Button>
              </form>
              <p>{uploadMessage}</p>
            </div>
          </Col>
          <Col md={6}>
            <div
              className="card border-info mb-3 "
              style={{ maxWidth: "20rem" }}
            >
              <div className="card-header">Your Details</div>
              <div className="card-body">
                <Form onSubmit={handleDetailsSubmit}>
                  <Form.Group controlId="weight">
                    <Form.Label>
                      <strong>Weight(kg):</strong>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={weight}
                      onChange={handleWeightChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="height">
                    <Form.Label>
                      <strong>Height(cm):</strong>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={height}
                      onChange={handleHeightChange}
                    />
                  </Form.Group>

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
                  <br></br>
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
              style={{ maxWidth: "30rem", maxHeight: "5.5rem" }}
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
