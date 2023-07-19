export default function FitnessLevel() {
    const mockData = {
      level: 5,
      progress: 75,
    };
  
    return (
      <div>
        <h3>Fitness Level</h3>
        <p>Level: {mockData.level}</p>
        <p>Progress to Next Level: {mockData.progress}%</p>
      </div>
    );
  }
  