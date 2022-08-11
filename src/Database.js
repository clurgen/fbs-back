import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql";

console.log(process.env.NODE_PORT, "2");
dotenv.config({
  path: `./${process.env.NODE_PORT}.env`,
});

const { DB_USER, DB_NAME, DB_HOST, DB_PASSWORD, DB_PORT } = process.env;

const db = mysql.createConnection({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_NAME,
});

export default db;
