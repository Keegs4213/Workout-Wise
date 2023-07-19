export default function PersonalRecords() {
    const mockData = {
      longestWorkout: "1 hour 30 minutes",
      heaviestLift: "100 kg",
      fastestRun: "5 km in 20 minutes",
      // Add more data as needed
    };
  
    return (
      <div>
        <h3>Personal Records</h3>
        <ul>
          <li>Longest Workout: {mockData.longestWorkout}</li>
          <li>Heaviest Lift: {mockData.heaviestLift}</li>
          <li>Fastest Run: {mockData.fastestRun}</li>
        </ul>
      </div>
    );
  }
  