export default function CalorieCount() {
    const mockData = {
      totalCalories: 500,
      goalCalories: 600,
    };
  
    return (
      <div>
        <h3>Calorie Count</h3>
        <p>Total Calories Burned: {mockData.totalCalories}</p>
        <p>Goal: {mockData.goalCalories}</p>
      </div>
    );
  }
  