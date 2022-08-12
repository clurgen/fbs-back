import dotenv from "dotenv";
import express from "express";
import router from "./Routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const { APP_PORT } = process.env;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);
app.use(cookieParser());
app.use("/src/images", express.static("src/images"));

app.listen(APP_PORT, () => {
  console.log("Yey, your server is running on port " + APP_PORT);
});

export default app;
