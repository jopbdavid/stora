require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const path = require("path");
// const connectDB = require("./db/connect");
const cors = require("cors");

//routes
const authRouter = require("./routes/auth");
const classRouter = require("./routes/class");
const studentRouter = require("./routes/student");
//error handler
const notFoundMiddleWare = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./frontend/public")));
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1> Test server </h1>");
});

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/student", studentRouter);

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Render testing => Server is listening on port ${port}`)
    );
  } catch (error) {
    console.error("Failed to start the server", error.stack);
    process.exit(1);
  }
};

start();
