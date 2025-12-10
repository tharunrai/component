import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import getItemsRouter from "./routes/getItems.router.js";
import addPersonRouter from "./routes/addPerson.router.js";
import authRoutes from "./routes/auth.routes.js";
import "./config/firebase.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend alive ...");
});

// Auth routes
app.use("/api/auth", authRoutes);

// Get items route
app.use("/api/items", getItemsRouter);

// Add person route
app.use("/api/people", addPersonRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
