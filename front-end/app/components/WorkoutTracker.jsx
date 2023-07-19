//components/WorkoutTracker.jsx
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import fetch from "isomorphic-unfetch";
import { useTable, usePagination } from 'react-table'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";

export default function WorkoutTracker() {
  const { register, handleSubmit, reset } = useForm();
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  


  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Exercise Name',
        accessor: 'exerciseName',
      },
      {
        Header: 'Sets',
        accessor: 'sets',
        Cell: ({ row }) => row.original.exerciseType === 'strength' ? row.value : null,
      },
      {
        Header: 'Reps',
        accessor: 'reps',
        Cell: ({ row }) => row.original.exerciseType === 'strength' ? row.value : null,
      },
      {
        Header: 'Weight Used',
        accessor: 'weight',
        Cell: ({ row }) => row.original.exerciseType === 'strength' ? row.value : null,
      },
      {
        Header: 'Duration',
        accessor: 'duration',
        Cell: ({ row }) => row.original.exerciseType === 'cardio' ? row.value : null,
      },
      {
        Header: 'Heart Rate',
        accessor: 'heartRate',
        Cell: ({ row }) => row.original.exerciseType === 'cardio' ? row.value : null,
      },
    ],
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable({ columns, data: workouts }, usePagination)

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
      { ...data, date: format(startDate, "yyyy-MM-dd"), exerciseType: selectedExercise.type },
    ]);
    reset(); // reset form fields after submit
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-group">
        <label>Date</label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <div >
            
          <label className="form-label">Exercise</label>
          <select {...register('exerciseName')} onChange={handleExerciseChange} className="form-select">
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <div >
        <h2>Previous Workouts</h2>
        <table {...getTableProps()} className="table table-striped">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div>
          <button  className="btn btn-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous Page
          </button>
          <button  className="btn btn-primary" onClick={() => nextPage()} disabled={!canNextPage}>
            Next Page
          </button>
          <div>
            Page{' '}
            <em>
              {pageIndex + 1} of {pageOptions.length}
            </em>
          </div>
        </div>
      </div>
    </div>
  );
}