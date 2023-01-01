import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRouter.js";
const app = express();

// body-parser default config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", userRoutes);

app.listen(8080, () => {
  console.log("Server Running");
});
