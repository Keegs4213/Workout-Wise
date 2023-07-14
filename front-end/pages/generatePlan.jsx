import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../app/components/Header";
import "../public/bootstrap.min.css";
import styles from '../app/globals.module.css';
import { Table } from 'react-bootstrap';

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomSets() {
  const sets = [3, 4];
  return sets[Math.floor(Math.random() * sets.length)];
}

function randomReps() {
  const reps = [10, 12, 15];
  return reps[Math.floor(Math.random() * reps.length)];
}

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

    // Define the number of exercises and days based on the user's fitness level
    const fitnessLevelMapping = {
      "Beginner": { exercises: 10, days: 2 },
      "Intermediate": { exercises: 15, days: 3 },
      "Expert": { exercises: 20, days: 4 },
    };

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
        exerciseTypes = ["strength", "cardio"];
        break;
      case "mobility":
        exerciseTypes = ["stretching"];
        break;
      default:
        exerciseTypes = ["strength"]; // default value
    }

    const fetchExercises = async (type, offset = 0, exercises = [], difficulties = [fitnessLevel]) => {
      try {
        const difficulty = difficulties.shift(); // get and remove the first difficulty from the array
        const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?type=${type}&difficulty=${difficulty}&offset=${offset}`, {
          headers: {
            'X-Api-Key': 'VPInujgC7uxthV//ZJVY4g==01tRgS7nO7Xsk04W'
          }
        });
    
        let newExercises = [...exercises, ...response.data];
    
        // If we have enough exercises, process them and add them to the plan
        if (newExercises.length >= fitnessLevelMapping[fitnessLevel].exercises) {
          return newExercises.slice(0, fitnessLevelMapping[fitnessLevel].exercises).map(exercise => {
            if (type === "strength") {
              return { ...exercise, recommendedSets: randomSets(), recommendedReps: randomReps() };
            } else { // type === "cardio"
              return { ...exercise, recommendedDuration: 30, recommendedSpeed: 5 };
            }
          });
        }
    
        // If we still don't have enough exercises and there are still difficulties to try, fetch more with the next difficulty
        if (difficulties.length > 0) {
          return fetchExercises(type, 0, newExercises, difficulties);
        }
    
        // If there are no more difficulties to try, fetch more with the same difficulty and a higher offset
        return fetchExercises(type, offset + 10, newExercises, [difficulty]);
      } catch (error) {
        console.error("Error fetching exercise plan:", error);
      }
    };
    
    const fetchAllExercises = async () => {
      // Fetch exercises for all types and combine them into one array
      let allExercises = [];
      for (const type of exerciseTypes) {
        const difficulties = fitnessLevel === "Expert" ? ["Expert", "Intermediate"] : [fitnessLevel];
        const exercises = await fetchExercises(type, 0, [], difficulties);
        allExercises = allExercises.concat(exercises);
      }
    
      // Shuffle and slice to get the correct number of exercises
      shuffleArray(allExercises);
      allExercises = allExercises.slice(0, fitnessLevelMapping[fitnessLevel].exercises);
    
      // Now build the plan as before
      const splitPlan = [];
      for (let i = 0; i < fitnessLevelMapping[fitnessLevel].days; i++) {
        splitPlan.push(allExercises.slice(i * (allExercises.length / fitnessLevelMapping[fitnessLevel].days), (i + 1) * (allExercises.length / fitnessLevelMapping[fitnessLevel].days)));
      }
      setExercisePlan(splitPlan);
    };
    

    // Fetch the exercises
    fetchAllExercises();
  }, []);

  return (
    <div>
      <Header/>
      <h2 className={styles.header2}>Your Customized Plan</h2>
      <div>
        <h3 className={styles.header2}>Exercise Plan:</h3>
        {exercisePlan && exercisePlan.length > 0 && (
          exercisePlan.map((day, i) => (
            <div key={i}>
              <h4>Day {i+1}</h4>
              <Table striped bordered hover className={`table-primary ${styles.exerciseTable}`}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Muscle</th>
                    <th>Difficulty</th>
                    <th>Recommendations</th>
                  </tr>
                </thead>
                <tbody>
                  {day.map((exercise, index) => (
                    <tr key={index}>
                      <td>{exercise.name}</td>
                      <td>{exercise.type}</td>
                      <td>{exercise.muscle}</td>
                      <td>{exercise.difficulty}</td>
                      <td>
                        {exercise.type === "strength" ?
                          `${exercise.recommendedSets} sets of ${exercise.recommendedReps} reps` :
                          `${exercise.recommendedDuration} mins at ${exercise.recommendedSpeed} km/h`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GeneratePlanPage;
