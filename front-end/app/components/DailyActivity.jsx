export default function DailyActivity() {
    const mockData = {
      "6 AM": "Running",
      "9 AM": "Yoga",
      "12 PM": "Rest",
      "3 PM": "Weightlifting",
      "6 PM": "Cycling",
      // Add more data as needed
    };
  
    return (
      <div>
        <h3>Daily Activity</h3>
        <ul>
          {Object.entries(mockData).map(([time, activity], index) => (
            <li key={index}>
              {time}: {activity}
            </li>
          ))}
        </ul>
      </div>
    );
  }