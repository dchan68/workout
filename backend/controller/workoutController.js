import workoutModel from "../models/workoutModel.js";
import Workout from "../models/workoutModel.js";
import mongoose from "mongoose";

//GET all workouts
async function getWorkouts(req, res) {
  const workout = await Workout.find({}).sort({ createdAt: -1 }); //sort({createdAt: -1}) will show newest workouts at the top
  res.status(200).json(workout);
}

//GET a single workoutModel
async function getWorkout(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    //ID in mongoose has to be a string of 12 bytes/ 24 hex characters. If it's not, it's not a valid ID
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
}

//Create a new workout
async function createWorkout(req, res) {
  const { title, load, reps } = req.body;
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//Delete a workout
async function deleteWorkout(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    //ID in mongoose has to be a string of 12 bytes/ 24 hex characters. If it's not, it's not a valid ID
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id }); //Mongoose uses _id so will try to find _id based on id user gives
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
}

//Update a workout
async function updateWorkout(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    //ID in mongoose has to be a string of 12 bytes/ 24 hex characters. If it's not, it's not a valid ID
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
}

export { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout };
