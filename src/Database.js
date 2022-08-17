import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql";

const { DB_USER, DB_NAME, DB_HOST, DB_PASSWORD, DB_PORT } = process.env;

const db = mysql.createPool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_NAME,
});

export default db;
