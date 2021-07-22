import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { invalidPath, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
    res.json("Hello");
});

app.use("/api/products/", productRoutes);

app.use(invalidPath);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server running on port 5000"));
