import express from "express";
import {
  addSupplier,
  deleteSupplierController,
  getSupplierById,
  getSuppliers,
  updateSupplierController,
} from "../controllers/supplier.controller.js";
const supplierRoute = express.Router();

supplierRoute.get("/", getSuppliers);
supplierRoute.get("/:id", getSupplierById);
supplierRoute.post("/create", addSupplier);
supplierRoute.delete("/delete/:id", deleteSupplierController);
supplierRoute.patch("/update/:id", updateSupplierController);

export default supplierRoute;
