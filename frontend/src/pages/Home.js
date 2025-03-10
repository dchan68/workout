import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

function Home() {
  const [workouts, setWorkouts] = useState(null);
  useEffect(function () {
    async function fetchWorkout() {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      console.log("The response for getting all the workouts " + response);

      if (response.ok) {
        setWorkouts(json);
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
