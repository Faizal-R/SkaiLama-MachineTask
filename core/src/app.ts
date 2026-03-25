import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/routes.js";
import { errorMiddleware } from "./errors/errorMiddleware.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("API running");
});

app.use("/api", routes);


app.use(errorMiddleware)

export default app;
