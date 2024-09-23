require("dotenv").config();
const express = require("express");
const { taskRouter, userRouter } = require("./routes");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); //POST,PUT

app.use("/user", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.listen(8000, () => {
  console.log(`server is listing on port :8000`);
});
