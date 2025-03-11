import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function Home() {
  //   const [workouts, setWorkouts] = useState(null);

  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(function () {
    async function fetchWorkout() {
      try {
        const response = await fetch("/api/workouts");
        const json = await response.json();

        if (response.ok) {
          //   setWorkouts(json);
          dispatch({ type: "SET_WORKOUTS", payload: json });
          console.log("this is the json ");
          console.log(json);
          console.log("this is the workout");
          console.log(workouts);
        }
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
      } catch (err) {
        console.error(error.message);
      }
    }
    fetchWorkout();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map(function (workout) {
            return <WorkoutDetails key={workout._id} workout={workout} />;
          })}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
