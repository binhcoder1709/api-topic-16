import express from "express";
import userRouter from "./routes/user.route.js";
import cors from 'cors'
const app = express();

app.use(cors())
app.use(express.json())

app.use("/users", userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server is running with port: ", PORT);
});
