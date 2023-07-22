import styles from "../globals.module.css"

export default function CalorieCount() {
    const mockData = {
      totalCalories: 500,
      goalCalories: 600,
    };
  
    return (
      <div>
        <h3 className={styles.dashboardText}>Calorie Count</h3>
        <p className={styles.dashboardText}>Total Calories Burned: {mockData.totalCalories}</p>
        <p className={styles.dashboardText}>Goal: {mockData.goalCalories}</p>
      </div>
    );
  }
  