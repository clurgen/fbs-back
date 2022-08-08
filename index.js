import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./src/Routes.js";
import cors from "cors";

const { APP_PORT } = process.env;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(APP_PORT, () => {
  console.log("Yey, your server is running on port " + APP_PORT);
});

export default app;
