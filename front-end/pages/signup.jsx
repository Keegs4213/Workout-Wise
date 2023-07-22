// pages/signup.jsx
import { useState } from 'react';
import SignupForm from '../app/components/SignupForm';
import { useRouter } from 'next/router';
import Header from '../app/components/Header';
import styles from '../app/globals.module.css';
import "../public/bootstrap.min.css"

export default function SignupPage() {
  const [message, setMessage] = useState('');
 
  const router = useRouter();

  const handleSignup = async (formData) => {
    try {
      const response = await fetch('http://localhost:3245/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      console.log(response); // Log the response object
      console.log(response.status);
      const data = await response.json();
      console.log(data); // Log the server's response
  
      if (response.ok) {
        setMessage(data.message);
  
        // If signup was successful, redirect to the fitness goals page
        if (response.status === 200) { // Check for the correct status code
          router.push('/setGoals');
        }
      } else {
        setMessage('Signup failed.');
      }
    } catch (error) {
      console.error(error); // Log any errors that occur
    }
  };

  return (
    <div className={styles["signup-container"]}>
      <Header/>
      <SignupForm onSignup={handleSignup} />
      <p>{message}</p>
    </div>
  );
}
