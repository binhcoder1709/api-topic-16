import express from "express";
import {
  addProduct,
  deleteProductController,
  getProducts,
  updateProductController,
} from "../controllers/product.controller.js";
const productRoute = express.Router();

productRoute.get("/", getProducts);
productRoute.post("/create", addProduct);
productRoute.patch("/update/:id", updateProductController);
productRoute.delete("/delete/:id", deleteProductController);

export default productRoute;
