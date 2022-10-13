import express from "express";
import mongoose from "mongoose";

import logger from "morgan";
import cors from "cors";

import ordersRouter from "./routes/orders.js";
import recordsRouter from "./routes/records.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(logger("dev"));


// ROUTES

app.use("/orders", ordersRouter);
app.use("/records", recordsRouter);
app.use("/users", usersRouter);

//GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(port, console.log(`DB connection successful and server running on port: ${port}`)))
  .catch((err) => console.log(err))


const port = process.env.PORT || 5000;


