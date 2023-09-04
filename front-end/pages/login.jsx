// pages/login.jsx
import { useState } from 'react';
import LoginForm from '../app/components/LoginForm';
import Header from '../app/components/Header';
import "../public/bootstrap.min.css"
import { useRouter } from 'next/router';
import styles from '../app/globals.module.css';
import LoadingSpinner from '../app/components/LoadingSpinner';


export default function LoginPage() {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles["page-container"]}>
      {isLoading ? ( 
        <LoadingSpinner />
      ) : (
        <>
          <Header/>
          <h2 className={styles.loginLabel}>Login</h2>
          <LoginForm />
          <p>{message}</p>
        </>
      )}
    </div>
  );
}