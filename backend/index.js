import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";

import {
  fetchAndSaveCompanies,
  getLiveData,
} from "./controllers/liveDataController.js";
import errorHandler from "./middlewares/errorHandler.js";
import companyRoutes from "./routes/companyRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api", companyRoutes);
app.use("/api", transactionRoutes);

// Live data routes
app.get("/api/live-data", getLiveData);
app.get("/api/sync", fetchAndSaveCompanies);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
