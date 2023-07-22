import styles from "../globals.module.css"

export default function WorkoutLog() {
    const mockData = [
      { date: "2023-07-21", workoutType: "Cycling", duration: "30 minutes", intensity: "Moderate" },
      { date: "2023-07-22", workoutType: "Weightlifting", duration: "1 hour", intensity: "High" },
      // Add more data as needed
    ];
  
    return (
      <div>
        <h3 className={styles.dashboardText}>Recent Workouts</h3>
        <ul className={styles.dashboardText}>
          {mockData.map((data, index) => (
            <li key={index}>
              {data.date}: {data.workoutType} for {data.duration} at {data.intensity} intensity
            </li>
          ))}
        </ul>
      </div>
    );
  }
  