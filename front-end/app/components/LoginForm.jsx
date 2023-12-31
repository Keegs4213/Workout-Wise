// Loginpage.jsx
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './../../app/globals.module.css'
import { Form, Button } from 'react-bootstrap'
import '../globals.css'
import { API_URL } from '../../config/config';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const router = useRouter()

  const handleEmailChange = (event) => setEmail(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); 


    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    setIsLoading(false); 

    if (response.ok) {
      const data = await response.json()
      console.log('data:', data)
      if (data) {
        setMessage('Login successful!')
        // Save the user's ID to local storage
        localStorage.setItem('userId', data.response._id)
        router.push('/dashboard')
      } else {
        setMessage('Login failed.')
      }
    } else {
      setMessage('Login failed.')
    }
  }

  return (
    <div className={styles.loginContainer}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className={styles.loginLabel}>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type='text'
            value={email}
            onChange={handleEmailChange}
            className={styles.loginInput}
          />
        </Form.Group>
        <Form.Group className={styles.loginLabel}>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={handlePasswordChange}
            className={styles.loginInput}
          />
        </Form.Group>
        <br></br>
        <Button variant='primary' type='submit' className={styles.loginButton}>
          Login
        </Button>
      </Form>
      <br></br>
      <Link href='/signup'>
        <p>Don&#39;t have an account?</p>
      </Link>
      <p>{message}</p>
    </div>
  )
}
export default LoginPage;



