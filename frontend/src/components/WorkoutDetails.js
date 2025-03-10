import React from "react";

function WorkoutDetails({ title, load, reps, createdAt }) {
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
    </div>
  );
}

export default WorkoutDetails;
