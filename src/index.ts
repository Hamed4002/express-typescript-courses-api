import "dotenv/config"; // must stay first: loads .env before other modules read process.env
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import debug from "debug";
import { log } from "./middlewares/logger";
import { authentication } from "./middlewares/authentication";
import homeRoute from "./routes/home-route";
import coursesRoute from "./routes/courses-route";

const startupLog = debug("app:startup");
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("env") is NODE_ENV, or "development" when NODE_ENV is not set
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupLog("morgan request logging enabled");
}

app.use(log);
app.use(authentication);

app.use("/", homeRoute);
app.use("/api/courses", coursesRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is working on port: ${port}`);
});
