// pages/login.jsx
import { useState } from 'react';
import LoginForm from '../app/components/LoginForm';

export default function LoginPage() {
  const [message, setMessage] = useState('');

  const handleLogin = async (formData) => {
    const response = await fetch('http://localhost:3245/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h2>Login</h2>
      <LoginForm onLogin={handleLogin} />
      <p>{message}</p>
    </div>
  );
}
