import express from "express";
import { connectToDatabase } from "./db/dbConfig";
import dataRoutes from "./routes/dataRoutes";
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false, //set to ensure Apollo Sandbox loads
  })
);
app.use(morgan("dev"));
// Middleware
app.use(express.json());

// Connect to the database
connectToDatabase();

// Routes
app.use("/api/data", dataRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
