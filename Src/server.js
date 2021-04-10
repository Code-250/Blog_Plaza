import "@babel/polyfill";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import allRoutes from "./app/routers/index";
import { serve, setup } from "swagger-ui-express";
import docs from "./docs/swagger.json";

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use("/api", allRoutes);
app.use("/api/doc", serve, setup(docs));
app.get("/", (req, res) => {
  res.status(200).send({
    message: "using babel in nodejs",
    success: "true",
  });
});
// set listener for request
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server is up and running on ${port}`);
});

export default app;