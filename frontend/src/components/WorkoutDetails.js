import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function WorkoutDetails({ title, load, reps, createdAt, _id }) {
  const { dispatch } = useWorkoutsContext();

  async function handleClick() {
    const response = await fetch("/api/workouts/" + _id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  }

  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p>
        <strong>Load (kg):</strong>
        {load}
      </p>
      <p>
        <strong>Reps:</strong>
        {reps}
      </p>
      <p>{createdAt}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  );
}

export default WorkoutDetails;
