const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./auth");  // Import the auth routes

const app = express();

// CORS Configuration
const corsOptions = {
    origin: "http://localhost:5173",  // Allow frontend to make requests
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,  // Allow cookies to be sent and received
};

app.use(cors(corsOptions));  // Use CORS middleware

// Middleware to parse JSON requests
app.use(express.json());

// Use auth routes (including login, logout, and user data)
app.use(authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
