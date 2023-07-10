// Loginpage.jsx
import { useState } from 'react';
import styles from './../../app/globals.css'
import { Form, Button } from 'react-bootstrap';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3245/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        setMessage('Login successful!');
      } else {
        setMessage('Login failed.');
      }
    } else {
      setMessage('Login failed.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className={styles.loginLabel}>
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" value={username} onChange={handleUsernameChange} className={styles.loginInput} />
        </Form.Group>
        <Form.Group className={styles.loginLabel}>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={handlePasswordChange} className={styles.loginInput} />
        </Form.Group>
        <Button variant="primary" type="submit" className={styles.loginButton}>Login</Button>
      </Form>
      <a href="/signup"><p>Don't have an account?</p></a>
      <p>{message}</p>
    </div>
  );
}

export default LoginPage;

