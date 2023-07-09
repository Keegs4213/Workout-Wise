//components/SignupForm.jsx
import { useState } from 'react';
import styles from './../../app/globals.css'

function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3245/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email }),
    });

    if (response.ok) {
      const data = await response.json();
      setMessage(data.message);
    } else {
      setMessage('Signup failed.');
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h2>Signup to WorkoutWise</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.signupLabel}>
          Name:
          <input type="text" value={username} onChange={handleUsernameChange} className={styles.signupInput} />
        </label>
        
        <label className={styles.signupLabel}>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} className={styles.signupInput} />
        </label><label className={styles.signupLabel}>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} className={styles.signupInput} />
        </label>
        <button type="submit" className={styles.signupButton}>Signup</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default SignupForm;
