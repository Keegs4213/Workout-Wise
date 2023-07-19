export default function WorkoutLog() {
    const mockData = [
      { date: "2023-08-15", workoutType: "Running", duration: "30 minutes", intensity: "Moderate" },
      { date: "2023-08-14", workoutType: "Weightlifting", duration: "1 hour", intensity: "High" },
      // Add more data as needed
    ];
  
    return (
      <div>
        <h3>Recent Workouts</h3>
        <ul>
          {mockData.map((data, index) => (
            <li key={index}>
              {data.date}: {data.workoutType} for {data.duration} at {data.intensity} intensity
            </li>
          ))}
        </ul>
      </div>
    );
  }
  