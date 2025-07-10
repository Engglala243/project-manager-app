const mysql = require("mysql2/promise");
require("dotenv").config();

const createDatabase = async () => {
  let connection;

  try {
    console.log("🔍 Creating database if it doesn't exist...");

    // Connect to MySQL without specifying database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
    });

    console.log("✅ Connected to MySQL server");

    // Create database if it doesn't exist
    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
    );
    console.log(
      `✅ Database '${process.env.DB_NAME}' created or already exists`
    );

    await connection.end();
    console.log("✅ Database setup completed!");
  } catch (error) {
    console.error("❌ Database creation failed:");
    console.error("Error:", error.message);

    if (connection) {
      await connection.end();
    }

    process.exit(1);
  }
};

createDatabase();
