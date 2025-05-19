const express = require("express");
const app = express();
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes.js");
const { noteRouter } = require("./routes/note.route.js");
const { authenticate } = require("./middlewares/authenticate.middleware.js");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use(authenticate);
app.use("/notes", noteRouter);

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (err) {
    console.log(err.message);
  }

  console.log("Server is running at port 8080");
});
