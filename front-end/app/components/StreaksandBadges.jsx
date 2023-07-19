export default function StreaksAndBadges() {
    const mockData = {
      currentStreak: 7,
      longestStreak: 10,
      badges: ["5 Days Streak", "First Workout", "100 Workouts"],
    };
  
    return (
      <div>
        <h3>Streaks and Badges</h3>
        <p>Current Streak: {mockData.currentStreak} days</p>
        <p>Longest Streak: {mockData.longestStreak} days</p>
        <h4>Badges:</h4>
        <ul>
          {mockData.badges.map((badge, index) => (
            <li key={index}>{badge}</li>
          ))}
        </ul>
      </div>
    );
  }
  