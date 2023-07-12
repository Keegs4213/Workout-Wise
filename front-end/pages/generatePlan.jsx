// pages/generate-plan.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../app/components/Header"
import "../public/bootstrap.min.css"

function GeneratePlanPage() {
  const [exercisePlan, setExercisePlan] = useState(null);
  const [nutritionPlan, setNutritionPlan] = useState(null);
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");

  useEffect(() => {
    const workoutPlan = JSON.parse(localStorage.getItem("workoutPlan"));
    const nutritionPlan = JSON.parse(localStorage.getItem("nutritionPlan"));
  
    setExercisePlan(workoutPlan);
    setNutritionPlan(nutritionPlan);
  }, []);

  useEffect(() => {
    // Fetch exercise plan
    axios.get(`https://api-ninjas.com/api/exercises?goal=${fitnessGoal}&level=${fitnessLevel}`)
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
      </div>
      <div>
        <h3>Nutrition Plan:</h3>
        {/* Display the nutrition plan here */}
      </div>
    </div>
  );
}

export default GeneratePlanPage;
