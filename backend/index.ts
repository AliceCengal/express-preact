import express from "express";
import path from "path";
import cors from "cors";
import cookieSession from "cookie-session";
import proxy from "express-http-proxy";
import logger from "morgan";

const app = express();

app.set("trust proxy", 1);

app.use(
  cookieSession({
    name: "session",
    keys: ["zebra-bison-gorilla"],
    maxAge: 24 * 3600 * 1000,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(cors({ }))

import apiRouters from "./routes";
app.use("/api", apiRouters);

app.use("/", proxy("http://localhost:8080"));
// app.use(express.static(path.join(__dirname, '../frontend/build')));

export default app;
