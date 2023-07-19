import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import fetch from "isomorphic-unfetch";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Pagination, Table } from "react-bootstrap";
import styles from "../globals.module.css";

const ITEMS_PER_PAGE = 4;

export default function WorkoutTracker() {
  const { register, handleSubmit, reset } = useForm();
  const [workouts, setWorkouts] = useState(
    JSON.parse(localStorage.getItem("workouts")) || []
  );
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [message, setMessage] = useState(""); // new state for message
  const [currentPage, setCurrentPage] = useState(0); // new state for current page

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Exercise Name",
        accessor: "exerciseName",
      },
      {
        Header: "Sets",
        accessor: "sets",
        Cell: ({ row }) =>
          row.original.exerciseType === "strength" ? row.value : null,
      },
      {
        Header: "Reps",
        accessor: "reps",
        Cell: ({ row }) =>
          row.original.exerciseType === "strength" ? row.value : null,
      },
      {
        Header: "Weight(kg)",
        accessor: "weight",
        Cell: ({ row }) =>
          row.original.exerciseType === "strength" ? row.value : null,
      },
      {
        Header: "Duration(m)",
        accessor: "duration",
        Cell: ({ row }) =>
          row.original.exerciseType === "cardio" ? row.value : null,
      },
      {
        Header: "Heart Rate(bpm)",
        accessor: "heartRate",
        Cell: ({ row }) =>
          row.original.exerciseType === "cardio" ? row.value : null,
      },
    ],
    []
  );

  

  const deleteWorkout = (index) => {
    const newWorkouts = [...workouts];
    newWorkouts.splice(index, 1);
    setWorkouts(newWorkouts);
    localStorage.setItem("workouts", JSON.stringify(newWorkouts));
  };

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
      }),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        console.log("Strength exercises:", data1); // log strength exercises
        console.log("Cardio exercises:", data2); // log cardio exercises
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
    // Validate form input
    if (
      !data.exerciseName ||
      (selectedExercise.type === "strength" &&
        (!data.sets || !data.reps || !data.weight)) ||
      (selectedExercise.type === "cardio" &&
        (!data.duration || !data.heartRate))
    ) {
      setMessage("Please fill in all required fields");
      return;
    }

    const newWorkout = {
      ...data,
      date: format(startDate, "yyyy-MM-dd"),
      exerciseType: selectedExercise.type,
      sets: Number(data.sets), // convert to number
      reps: Number(data.reps), // convert to number
      weight: Number(data.weight), // convert to number
      duration: Number(data.duration), // convert to number
      heartRate: Number(data.heartRate), // convert to number
    };

    // Save to local storage
    const savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
    savedWorkouts.push(newWorkout);
    localStorage.setItem("workouts", JSON.stringify(savedWorkouts));

    // Save to state
    setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);

    setMessage("Workout added successfully, nice work!");
    reset(); // reset form fields after submit
  };

  const totalItems = workouts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const start = currentPage * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentWorkouts = workouts.slice(start, end);

  const handlePrevPage = () => {
    setCurrentPage((old) => Math.max(old - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((old) => Math.min(old + 1, totalPages - 1));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-group">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <label>Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div>
            <label className="form-label">Exercise</label>
            <select
              {...register("exerciseName", { required: true })}
              onChange={handleExerciseChange}
              className="form-select"
              style={{ width: "250px" }}
            >
              <option value="">Select an exercise</option>
              {Array.isArray(exercises) &&
                exercises.map((exercise, index) => (
                  <option key={index} value={exercise.name}>
                    {exercise.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {selectedExercise && selectedExercise.type === "strength" && (
            <>
              <div>
                <label>Sets</label>
                <input
                  type="number"
                  {...register("sets", { required: true })}
                />
              </div>
              <div>
                <label>Reps</label>
                <input
                  type="number"
                  {...register("reps", { required: true })}
                />
              </div>
              <div>
                <label>Weight Used (kg)</label>
                <input
                  type="number"
                  {...register("weight", { required: true })}
                />
                 <button
          type="submit"
          className="btn btn-primary"
          style={{ margin: "5px" }}
        >
          Submit
        </button>
              </div>
            </>
          )}
          {selectedExercise && selectedExercise.type === "cardio" && (
            <>
              <div>
                <label>Duration(minutes)</label>
                <input
                  type="number"
                  {...register("duration", { required: true })}
                />
              </div>
              <div>
                <label>Heart Rate(bpm)</label>
                <input
                  type="number"
                  {...register("heartRate", { required: true })}
                />
              </div>
            </>
          )}
        </div>
       
      </form>

      <div>
        <h2 className={styles.header2}>Previous Workouts</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              {columns.map((column, i) => (
                <th key={i}>{column.Header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentWorkouts.map((workout, i) => (
              <tr key={i}>
                <td>{workout.date}</td>
                <td>{workout.exerciseName}</td>
                <td>{workout.sets}</td>
                <td>{workout.reps}</td>
                <td>{workout.weight}</td>
                <td>{workout.duration}</td>
                <td>{workout.heartRate}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => deleteWorkout(i + ITEMS_PER_PAGE * currentPage)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <Pagination style={{ display: "flex", justifyContent:"center", alignItems: "center", marginBottom: "20px" }}>
            <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 0} />
            <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages - 1} />
          </Pagination>
        </div>
      </div>
    </div>
  );
}
