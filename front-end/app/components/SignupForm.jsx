//components/SignupForm.jsx
import { useState } from "react";
import styles from "./../../app/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = isClient ? useRouter() : undefined;


  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);


    const response = await fetch("http://localhost:3245/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    if (response.ok) {
      const data = await response.json();
      setMessage(data.message);
    } else {
      setMessage("Signup failed.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (router) {
      router.push({pathname:`/setGoals`, query:{}});
    }
  };
  return (
    <div className={styles.signupContainer}>
      <h2>Signup to WorkoutWise</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.signupLabel}>
          Name:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className={styles.signupInput}
          />
        </label>

        <label className={styles.signupLabel}>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={styles.signupInput}
          />
        </label>
        <label className={styles.signupLabel}>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.signupInput}
          />
        </label>
        <button
          type="submit"
          className={styles.signupButton}
          onClick={handleSubmit}
        >
          Signup
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default SignupForm;
