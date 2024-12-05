const express = require("express");
const app = express();
app.use(express.json());

const PORT = 8080;

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/thegoodcorner", {})
  .then(() => {
    console.log("Connected to the mongoDB database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const route = require("./route");
app.use("/", route);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
