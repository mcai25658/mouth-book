import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
// import {readdirSync} from 'fs'
import "colors";

dotenv.config();
const app = express();

if (process.env.NODE_ENV === "DEV") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

//routes
// readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`.yellow.bold);
});
