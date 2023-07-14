// pages/generate-plan.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../app/components/Header";
import "../public/bootstrap.min.css";
import styles from '../app/globals.module.css';
import { Table } from 'react-bootstrap';

function GeneratePlanPage() {
  const [exercisePlan, setExercisePlan] = useState([]);

  useEffect(() => {
    const fitnessGoal = localStorage.getItem("fitnessGoal");
    const fitnessLevel = localStorage.getItem("fitnessLevel");
    console.log(fitnessGoal);
    console.log(fitnessLevel);

     // If the user hasn't set fitnessGoal and fitnessLevel yet, don't make an API request.
     if (!fitnessGoal || !fitnessLevel) {
      return;
    }

    // Determine the exercise types based on fitness goal
    let exerciseTypes = [];
    switch(fitnessGoal.toLowerCase()) {
      case "muscle gain":
        exerciseTypes = ["strength"];
        break;
      case "fat loss":
        exerciseTypes = ["cardio"];
        break;
      case "tone up":
        exerciseTypes = ["strength"];
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
        setExercisePlan(response.data);
      })
      .catch(error => {
        console.error("Error fetching exercise plan:", error);
      });
    });
  },[]);

  return (
    <div>
      <Header/>
      <h2>Your Customized Plan</h2>
      <div>
        <h3>Exercise Plan:</h3>
        {/* Display the exercise plan in a table */}
        {exercisePlan && exercisePlan.length > 0 && (
          <Table striped bordered hover className={`table-primary ${styles.exerciseTable}`}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Muscle</th>
                <th>Difficulty</th>
                <th>Instructions</th>
              </tr>
            </thead>
            <tbody>
              {exercisePlan.map((exercise, index) => (
                <tr key={index}>
                  <td>{exercise.name}</td>
                  <td>{exercise.type}</td>
                  <td>{exercise.muscle}</td>
                  <td>{exercise.difficulty}</td>
                  <td className={styles.tableInstructions}>{exercise.instructions}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default GeneratePlanPage;
