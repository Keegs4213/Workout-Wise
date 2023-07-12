// pages/login.jsx
import { useState } from 'react';
import LoginForm from '../app/components/LoginForm';
import Header from '../app/components/Header';
import "../public/bootstrap.min.css"
import { useRouter } from 'next/router';
import styles from '../app/globals.module.css';

export default function LoginPage() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  // const handleLogin = async (formData) => {
  //   const response = await fetch('http://localhost:3245/auth/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(formData),
  //   });
    
  //   const data = await response.json();
  //   setMessage(data.message);
  //   if(response.ok) {
  //     router.push('/dashboard');
  //   }
  // };

  return (
    <div>
      <Header/>
      <h2>Login</h2>
      <LoginForm />
      <p>{message}</p>
    </div>
  );
}