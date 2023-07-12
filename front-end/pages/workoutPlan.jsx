import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from "../app/components/Header"
import "../public/bootstrap.min.css"


const WorkoutWise = () => {
  const [exercises, setExercises] = useState([]);
  
  useEffect(() => {
    const muscle = 'biceps';  // you can change this to be dynamic or user input
    const getExercises = async () => {
      try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
          headers: { 'X-Api-Key': 'VPInujgC7uxthV//ZJVY4g==01tRgS7nO7Xsk04W' }
        });
        setExercises(response.data);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      }
    };
    
    getExercises();
  }, []);

  return (
    <div>
        <Header/>
      <h1>Exercises for Biceps</h1>
      {exercises.map((exercise, index) => (
        <div key={index}>
          <h2>{exercise.name}</h2>
          <p>Type: {exercise.type}</p>
          <p>Difficulty: {exercise.difficulty}</p>
          <p>Instructions: {exercise.instructions}</p>
        </div>
      ))}
    </div>
  );
};

export default WorkoutWise;
