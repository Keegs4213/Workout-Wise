//components/WorkoutTracker.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';


export default function WorkoutTracker() {
    const { register, handleSubmit } = useForm();
    const [workouts, setWorkouts] = useState([]);


    console.log(useForm())

    const onSubmit = (data) => {
        console.log(data)
        setWorkouts(prevWorkouts => [...prevWorkouts, { ...data, date: format(new Date(), 'yyyy-MM-dd') }]);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Exercise Name</label>
                    <input {...register('exerciseName')} />
                </div>
                <div>
                    <label>Sets</label>
                    <input type="number" {...register('sets')} />
                </div>
                <div>
                    <label>Reps</label>
                    <input type="number" {...register('reps')} />
                </div>
                <div>
                    <label>Weight Used</label>
                    <input type="number" {...register('weight')} />
                </div>
                <div>
                    <label>Resistance/Incline</label>
                    <input type="number" {...register('resistance')} />
                </div>
                <div>
                    <label>Speed</label>
                    <input type="number" {...register('speed')} />
                </div>
                <div>
                    <label>Duration</label>
                    <input type="number" {...register('duration')} />
                </div>
                <div>
                    <label>Heart Rate</label>
                    <input type="number" {...register('heartRate')} />
                </div>
                <button type="submit">Submit</button>
            </form>

            <div>
                <h2>Previous Workouts</h2>
                {workouts.map((workout, index) => (
                    <div key={index}>
                        <h3>{workout.date}</h3>
                        <p>Exercise Name: {workout.exerciseName}</p>
                        {/* Add other workout properties here */}
                    </div>
                ))}
            </div>
        </div>
    );
}
