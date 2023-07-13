// pages/generate-plan.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../app/components/Header";
import "../public/bootstrap.min.css";
import styles from '../app/globals.module.css';

function GeneratePlanPage() {
  const [exercisePlan, setExercisePlan] = useState([]);

  useEffect(() => {
    const fitnessGoal = localStorage.getItem("fitnessGoal");
    const fitnessLevel = localStorage.getItem("fitnessLevel");
    console.log(fitnessGoal);
    console.log(fitnessLevel);

    // Determine the exercise types based on fitness goal
    let exerciseTypes = [];
    switch(fitnessGoal.toLowerCase()) {
      case "muscle gain":
        exerciseTypes = ["strength"];
        break;
      case "lose fat":
        exerciseTypes = ["cardio"];
        break;
      case "tone up":
        exerciseTypes = ["strength", "cardio"];
        break;
      case "mobility":
        exerciseTypes = ["stretching"];
        break;
      default:
        exerciseTypes = ["strength"]; // default value
    }

    exerciseTypes.forEach((type) => {
      // Fetch exercise plan for each type
      axios.get(`https://api.api-ninjas.com/v1/exercises?type=${type}&difficulty=${fitnessLevel}`, {
        headers: {
          'X-Api-Key': 'VPInujgC7uxthV//ZJVY4g==01tRgS7nO7Xsk04W'
        }
      })
      .then(response => {
        setExercisePlan(prevPlan => [...prevPlan, ...response.data]);
      })
      .catch(error => {
        console.error("Error fetching exercise plan:", error);
      });
    });
  }, []);

  return (
    <div>
      <Header/>
      <h2>Your Customized Plan</h2>
      <div>
        <h3>Exercise Plan:</h3>
        {/* Display the exercise plan here */}
        {exercisePlan && exercisePlan.map((exercise, index) => (
          <div key={index}>
            <h4>{exercise.name}</h4>
            <p>{exercise.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeneratePlanPage;
