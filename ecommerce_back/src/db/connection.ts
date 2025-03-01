import mysql from "mysql2/promise";
import Config from "../Config";
import { Sequelize } from "sequelize";

const { nameDB, userDB, PasswordDB, hostDB, portDB } = Config;

const db = new Sequelize(nameDB, userDB, PasswordDB, {
  dialect: "mysql",
  host: hostDB,
  port: Number(portDB),
  timezone: "-05:00",
  logging: false,
});

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: hostDB,
    port: Number(portDB),
    user: userDB,
    password: PasswordDB,
    connectTimeout: 30000, // Increase timeout to 30 seconds
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${nameDB}\`;`);
  await connection.end();
}

async function syncDB() {
  console.log("Syncing database...");
  await createDatabase();

  await db.sync({ alter: false, force: false });
  console.log("Database synced");
}

syncDB();

export default db;
