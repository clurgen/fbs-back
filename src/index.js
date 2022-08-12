import dotenv from "dotenv";
import express from "express";
import router from "./Routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const { APP_PORT } = process.env;
console.log(APP_PORT);
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(cors({ origin: true }));
app.use("/", router);
app.use(cookieParser());
app.use("/src/images", express.static("src/images"));

app.listen(APP_PORT, () => {
  console.log("Yey, your server is running on port " + APP_PORT);
});

export default app;
