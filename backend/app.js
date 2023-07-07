require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const cors = require("cors");

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./frontend/public")));
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1> Test server </h1>");
});

//routes
app.use("/api/v1/auth", authRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
