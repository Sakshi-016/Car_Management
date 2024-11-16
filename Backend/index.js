import express from "express";
import { config } from "dotenv";
import cors from "cors";
import dbConnection from "./Connection/dbConnection.js";
import router from "./Routes/authRoutes.js";
import path from 'path';
import authRoutes from "./Routes/authRoutes.js"
import carRoutes from './routes/carRoutes.js';
import cookieParser from "cookie-parser";
const app = express();
config({ path: "./.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    // origin: process.env.FRONTEND_URL,
    origin: 'http://localhost:5173',  // Allow requests only from this React app's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use('/api',router);
// Serve static files
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

app.options("*", cors);

dbConnection()

try {
  app.listen(process.env.PORT, () => {
    console.log("app is listing on port ", process.env.PORT);
  });
} catch (error) {
  console.log("Error", error);
}