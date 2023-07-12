// pages/generate-plan.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../app/components/Header";
import "../public/bootstrap.min.css";
import styles from '../app/globals.module.css';

function GeneratePlanPage() {
  const [exercisePlan, setExercisePlan] = useState(null);
  const [nutritionPlan, setNutritionPlan] = useState(null);
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");

  useEffect(() => {
    const workoutPlan = JSON.parse(localStorage.getItem("workoutPlan"));
    const nutritionPlan = JSON.parse(localStorage.getItem("nutritionPlan"));

    // Retrieve fitness goal and level
    const storedFitnessGoal = localStorage.getItem("fitnessGoal");
    const storedFitnessLevel = localStorage.getItem("fitnessLevel");

    setExercisePlan(workoutPlan);
    setNutritionPlan(nutritionPlan);
    setFitnessGoal(storedFitnessGoal);
    setFitnessLevel(storedFitnessLevel);
  }, []);

  useEffect(() => {
    // Determine the exercise type based on fitness goal
    let exerciseType = "";
    switch(fitnessGoal) {
      case "mobility":
        exerciseType = "stretching";
        break;
      case "muscle gain":
        exerciseType = "strength";
        break;
      case "tone up":
        exerciseType = "strength" + "cardio"
        break;
      case "lose fat":
        exerciseType = "cardio"
      // Add more cases as per the goals
      default:
        exerciseType = "strength"; // default value
    }

    // Fetch exercise plan
    axios.get(`https://api.api-ninjas.com/v1/exercises?type=${exerciseType}&difficulty=${fitnessLevel}`, {
      headers: {
        'X-Api-Key': 'VPInujgC7uxthV//ZJVY4g==01tRgS7nO7Xsk04W'
      }
    })
      .then(response => {
        setExercisePlan(response.data);
      })
      .catch(error => {
        console.error("Error fetching exercise plan:", error);
      });

    // Fetch nutrition plan
    // Please replace 'YOUR_SPOONACULAR_API_KEY' with your actual API key
    axios.get(`https://api.spoonacular.com/mealplanner/generate?apiKey=YOUR_SPOONACULAR_API_KEY&timeFrame=week&diet=${fitnessGoal}`)
      .then(response => {
        setNutritionPlan(response.data);
      })
      .catch(error => {
        console.error("Error fetching nutrition plan:", error);
      });
  }, [fitnessGoal, fitnessLevel]); // added dependencies

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
      <div>
        <h3>Nutrition Plan:</h3>
        {/* Display the nutrition plan here */}
      </div>
    </div>
  );
}

export default GeneratePlanPage;
