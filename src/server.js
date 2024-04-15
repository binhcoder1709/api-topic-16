import express from "express";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import orderRoute from "./routes/order.route.js";
import supplierRoute from "./routes/supplier.route.js";
import productRoute from "./routes/product.route.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/orders", orderRoute);
app.use("/suppliers", supplierRoute);
app.use("/products", productRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server is running with port: ", PORT);
});
