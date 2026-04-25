import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const mysql_db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

await mysql_db.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
console.log(await mysql_db.execute(`show databases`));
export default mysql_db;
