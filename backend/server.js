const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Import database connection
const sequelize = require("./config/database");

// Import routes
const projectRoutes = require("./routes/projectRoutes");
const clientRoutes = require("./routes/clientRoutes");
const contactRoutes = require("./routes/contactRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");

// Import middleware
const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Add your frontend URLs
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(logger);

// Static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/subscribers", subscriberRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use(errorHandler);

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Don't exit the process, just log the error
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Don't exit the process, just log the error
});

// Database connection and server start
const startServer = async () => {
  try {
    console.log("Starting server...");
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Database:", process.env.DB_NAME);
    console.log("Host:", process.env.DB_HOST);

    // Test database connection with retry logic
    let retries = 3;
    while (retries > 0) {
      try {
        await sequelize.authenticate();
        console.log("✅ Database connection established successfully.");
        break;
      } catch (error) {
        retries--;
        console.error(
          `❌ Database connection failed. Retries left: ${retries}`
        );
        console.error("Error:", error.message);

        if (retries === 0) {
          console.error(
            "❌ Could not connect to database after multiple attempts."
          );
          console.log("🔄 Starting server without database connection...");
          console.log(
            "📝 Please check your database configuration and ensure MySQL is running."
          );
          break;
        }

        // Wait 2 seconds before retry
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    // Try to sync models, but don't fail if database is not available
    try {
      await sequelize.sync({ alter: false });
      console.log("✅ Database synchronized successfully.");
    } catch (error) {
      console.error("⚠️  Database sync failed:", error.message);
      console.log("🔄 Server will continue without database sync...");
    }

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
      console.log(`📊 API Base URL: http://localhost:${PORT}/api`);
      console.log("✅ Server started successfully!");
    });

    // Handle server errors
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          `❌ Port ${PORT} is already in use. Please use a different port.`
        );
      } else {
        console.error("❌ Server error:", error);
      }
    });

    // Graceful shutdown
    process.on("SIGTERM", () => {
      console.log("🛑 SIGTERM received. Shutting down gracefully...");
      server.close(() => {
        console.log("✅ Server closed.");
        sequelize.close();
        process.exit(0);
      });
    });

    process.on("SIGINT", () => {
      console.log("🛑 SIGINT received. Shutting down gracefully...");
      server.close(() => {
        console.log("✅ Server closed.");
        sequelize.close();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    console.log("🔄 Attempting to start server anyway...");

    // Try to start server even if database connection fails
    try {
      const server = app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT} (without database)`);
        console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
        console.log("⚠️  Database features may not work properly.");
      });
    } catch (serverError) {
      console.error("❌ Could not start server:", serverError);
      process.exit(1);
    }
  }
};

startServer();

module.exports = app;
