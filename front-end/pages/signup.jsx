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

  return (
    <div className={styles["page-container"]}>
      <Header/>
      <SignupForm setMessage={setMessage} />
      <p>{message}</p>
    </div>
  );
}
