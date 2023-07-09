// pages/signup.jsx
import { useState } from 'react';
import SignupForm from '../app/components/SignupForm';

export default function SignupPage() {
  const [message, setMessage] = useState('');

  const handleSignup = async (formData) => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h2>Signup</h2>
      <SignupForm onSignup={handleSignup} />
      <p>{message}</p>
    </div>
  );
}
