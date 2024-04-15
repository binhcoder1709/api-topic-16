import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrders,
} from "../controllers/order.controller.js";
const orderRoute = express.Router();

orderRoute.get("/", getOrders);
orderRoute.post("/create", createOrder);
orderRoute.delete("/delete/:id", deleteOrder);

export default orderRoute;
