//pages/setGoals.jsx

import styles from './../../app/globals.css'
import { useRouter } from 'next/router';

const goals = [
  {
    image: "/path/to/image1.png",
    name: "Goal 1"
  },
  {
    image: "/path/to/image2.png",
    name: "Goal 2"
  },
  {
    image: "/path/to/image3.png",
    name: "Goal 3"
  },
  {
    image: "/path/to/image4.png",
    name: "Goal 4"
  },
];

function FitnessGoalsPage() {
  const router = useRouter();

  const handleGoalClick = () => {
    router.push('/customize-goal');
  };

  return (
    <div className={styles.fitnessGoalsContainer}>
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