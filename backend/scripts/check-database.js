const sequelize = require("../config/database");

const checkDatabase = async () => {
  try {
    console.log("🔍 Checking database connection...");
    console.log("Database Name:", process.env.DB_NAME);
    console.log("Database Host:", process.env.DB_HOST);
    console.log("Database User:", process.env.DB_USER);

    await sequelize.authenticate();
    console.log("✅ Database connection successful!");

    // Test query
    const [results] = await sequelize.query("SELECT 1 as test");
    console.log("✅ Database query test successful!");

    await sequelize.close();
    console.log("✅ Database connection closed.");
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error("Error:", error.message);

    if (error.original) {
      console.error("Original Error:", error.original.message);
      console.error("Error Code:", error.original.code);
    }

    console.log("\n📝 Troubleshooting steps:");
    console.log("1. Make sure MySQL server is running");
    console.log("2. Check if the database 'flipr_db' exists");
    console.log("3. Verify your database credentials in .env file");
    console.log("4. Check if the database user has proper permissions");

    process.exit(1);
  }
};

checkDatabase();
