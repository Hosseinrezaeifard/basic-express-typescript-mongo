import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connect from "./utils/dbConnection";
import userRoutes from "./routes/user";

dotenv.config();
const PORT = process.env.PORT;

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// connect().then(() => {
app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);
// });
