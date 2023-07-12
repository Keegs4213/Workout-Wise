//pages/setGoals.jsx

import styles from '../app/globals.css'
import { useRouter } from 'next/router';
import '../public/bootstrap.min.css';
import Header from '../app/components/Header';


const goals = [
  {
    image: "/musclegain.png",
    name: "Muscle Gain"
  },
  {
    image: "/fatloss.png",
    name: "Fat Loss"
  },
  {
    image: "/toneup.png",
    name: "Tone up"
  },
  {
    image: "/mobility.png",
    name: "Mobility"
  },
];

function FitnessGoalsPage() {
  const router = useRouter();

  const handleGoalClick = (goal) => {
    // Save goal to local storage
    localStorage.setItem("fitnessGoal", goal);
  
    router.push('/fitnessLevel');
  };

  return (
    <div className={styles.fitnessGoalsContainer}>
      <Header/>
      <h2>Select Your Fitness Goal</h2>
      <div className={styles.goalsGrid}>
        {goals.map((goal, index) => (
          <div key={index} onClick={handleGoalClick} className={styles.goalCard}>
            <img src={goal.image} alt={goal.name} className={styles.goalImage} />
            <h3>{goal.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FitnessGoalsPage;