import express from "express";
import workoutRoutes from "./routes/workout.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();

app.use(express.json()); //looks into any requests that comes in and see if it has any body to it and if it does, it parses it and attach it to request object
//You NEED express.json() and express.urlencoded() for POST and PUT requests, because in both these requests you are sending data (in the form of some data
// object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request
//a. express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());
//b. express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded());
app.use(function (req, res, next) {
  console.log(req.path, req.method);
  next();
});

//Routes
//when it detects this url endpoint, then it will use workoutRoutes
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(function () {
    app.listen(process.env.PORT, function () {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
