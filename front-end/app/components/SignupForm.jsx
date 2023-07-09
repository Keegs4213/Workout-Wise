//components/SignupForm.jsx
import { useState } from "react";
import styles from "./../../app/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

const FormInput = ({label, type, value, onChange, className, name}) => (
  <label className={styles.signupLabel}>
    {label}:
    <input type={type} name={name} value={value} onChange={onChange} className={className} />
  </label>
)

function SignupForm() {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [message, setMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = isClient ? useRouter() : undefined;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormState(prevState => ({...prevState, [name]: value}));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3245/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });

    if (response.ok) {
      const data = await response.json();
      setMessage(data.message);
      if(router) {
        router.push({pathname:`/setGoals`, query:{}});
      }
    } else {
      setMessage("Signup failed.");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h2>Signup to WorkoutWise</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          value={formState.username}
          onChange={handleInputChange}
          className={styles.signupInput}
          name="username"
        />
        <FormInput
          label="Email"
          type="email"
          value={formState.email}
          onChange={handleInputChange}
          className={styles.signupInput}
          name="email"
        />
        <FormInput
          label="Password"
          type="password"
          value={formState.password}
          onChange={handleInputChange}
          className={styles.signupInput}
          name="password"
        />
        <button type="submit" className={styles.signupButton}>
          Signup
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default SignupForm;