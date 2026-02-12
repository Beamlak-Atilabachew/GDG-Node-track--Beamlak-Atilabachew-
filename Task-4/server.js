import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import app from "./app.js";

// Load environment variables first
dotenv.config({ path: './Task-4/.env' });

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});