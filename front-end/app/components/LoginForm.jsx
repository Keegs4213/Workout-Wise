// Loginpage.jsx
import { useState } from 'react';
import { useRouter } from 'next/router'
import styles from './../../app/globals.module.css'
import { Form, Button } from 'react-bootstrap';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const router =  useRouter()

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3245/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data) {
        setMessage('Login successful!');
        router.push('/dashboard')
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
          <Form.Label>Email:</Form.Label>
          <Form.Control type="text" value={email} onChange={handleEmailChange} className={styles.loginInput} />
        </Form.Group>
        <Form.Group className={styles.loginLabel}>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={handlePasswordChange} className={styles.loginInput} />
        </Form.Group>
        <br></br>
        <Button variant="primary" type="submit" className={styles.loginButton}>Login</Button>
      </Form>
      <a href="/signup"><p>Don't have an account?</p></a>
      <p>{message}</p>
    </div>
  );
}

export default LoginPage;

