// Loginpage.jsx
import { useState } from 'react';
import styles from './../../app/globals.css'

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
      <h2>Login to WorkoutWise</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.loginLabel}>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} className={styles.loginInput} />
        </label>
        <label className={styles.loginLabel}>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} className={styles.loginInput} />
        </label>
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default LoginPage;
