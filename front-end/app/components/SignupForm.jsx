//components/SignupForm.jsx
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import styles from "./../../app/globals.module.css";

function SignupForm() {
  const [formState, setFormState] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [emailTaken, setEmailTaken] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = isClient ? useRouter() : undefined;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3245/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });

    if (response.ok) {
      const data = await response.json();
      setMessage(data.message);
      // Store user's ID in local storage
    localStorage.setItem('userId', data.response._id);
      if (router) {
        router.push({ pathname: `/setGoals`, query: {} });
      }
    } else {
      if (response.status === 400) {
        setEmailTaken(true);
        const data = await response.json();
        setMessage(data.message);
      } else {
        setMessage("Signup failed.");
      }
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={formState.name}
            onChange={handleInputChange}
            name="name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={formState.email}
            onChange={handleInputChange}
            name="email"
            isInvalid={emailTaken}
            required
          />
          <Form.Control.Feedback type="invalid">
            Sorry, that email address is taken. Try another?
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={formState.password}
            onChange={handleInputChange}
            name="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
      <p>{message}</p>
    </div>
  );
}

export default SignupForm;
