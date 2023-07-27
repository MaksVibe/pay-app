import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/", routes);

const port = process.env.PORT || 3010;
const uriDb = process.env.MONGODB_URL;
const server = http.createServer(app);

mongoose.set("strictQuery", true);
mongoose
  .connect(`${uriDb}`)
  .then(() => {
    console.log("Database connected successfully");
    server.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  })
  .catch((error) => {
    console.log({ error });
    process.exit(1);
  });
