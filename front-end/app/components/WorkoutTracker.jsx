//components/WorkoutTracker.jsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import fetch from "isomorphic-unfetch";

export default function WorkoutTracker() {
  const { register, handleSubmit, reset } = useForm();
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    // fetch both strength and cardio exercises
    Promise.all([
      fetch("https://api.api-ninjas.com/v1/exercises?type=strength", {
        headers: {
          "X-Api-Key": "VPInujgC7uxthV//ZJVY4g==01tRgS7nO7Xsk04W",
        },
      }),
      fetch("https://api.api-ninjas.com/v1/exercises?type=cardio", {
        headers: {
          "X-Api-Key": "VPInujgC7uxthV//ZJVY4g==01tRgS7nO7Xsk04W",
        },
      })
    ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([data1, data2]) => {
      console.log("Strength exercises:", data1);  // log strength exercises
      console.log("Cardio exercises:", data2);  // log cardio exercises
      setExercises([...data1, ...data2]);
    });
  }, []);
  

  const handleExerciseChange = (e) => {
    const selected = exercises.find(
      (exercise) => exercise.name === e.target.value
    );
    setSelectedExercise(selected);
  };

  const onSubmit = (data) => {
    setWorkouts((prevWorkouts) => [
      ...prevWorkouts,
      { ...data, date: format(new Date(), "yyyy-MM-dd"), exerciseType: selectedExercise.type },
    ]);
    reset(); // reset form fields after submit
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Exercise</label>
          <select {...register('exerciseName')} onChange={handleExerciseChange}>
            {Array.isArray(exercises) &&
              exercises.map((exercise, index) => (
                <option key={index} value={exercise.name}>
                  {exercise.name}
                </option>
              ))}
          </select>
        </div>
        {selectedExercise && selectedExercise.type === "strength" && (
          <>
            <div>
              <label>Sets</label>
              <input type="number" {...register("sets")} />
            </div>
            <div>
              <label>Reps</label>
              <input type="number" {...register("reps")} />
            </div>
            <div>
              <label>Weight Used</label>
              <input type="number" {...register("weight")} />
            </div>
          </>
        )}
        {selectedExercise && selectedExercise.type === "cardio" && (
          <>
            <div>
              <label>Duration</label>
              <input type="number" {...register("duration")} />
            </div>
            <div>
              <label>Heart Rate</label>
              <input type="number" {...register("heartRate")} />
            </div>
          </>
        )}
        <button type="submit">Submit</button>
      </form>

      <div>
        <h2>Previous Workouts</h2>
        {workouts.map((workout, index) => (
          <div key={index}>
            <h3>{workout.date}</h3>
            <p>Exercise Name: {workout.exerciseName}</p>
            {/* Add other workout properties here */}
            {workout.exerciseType === 'strength' && (
              <>
                <p>Sets: {workout.sets}</p>
                <p>Reps: {workout.reps}</p>
                <p>Weight Used: {workout.weight}</p>
              </>
            )}
            {workout.exerciseType === 'cardio' && (
              <>
                <p>Duration: {workout.duration}</p>
                <p>Heart Rate: {workout.heartRate}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
