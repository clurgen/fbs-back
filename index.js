import mysql from "mysql";
import express from "express";
import router from "./src/Routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

export default app;
