import {
  supplierByIdService,
  supplierService,
} from "../services/supplier.service.js";

const getSuppliers = async (req, res) => {
  const suppliersRef = await supplierService();
  suppliersRef.once("value", (snapshot) => {
    const suppliers = snapshot.val();
    let suppliersArray = [];
    if (suppliers) {
      suppliersArray = Object.keys(suppliers).map((item) => ({
        id: item,
        ...suppliers[item],
      }));
      return res.status(200).json(suppliersArray);
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

const getSupplierById = async (req, res) => {
  const id = req.params.id;
  const suppliersRef = await supplierByIdService(id);
  suppliersRef.once("value", (snapshot) => {
    const suppliers = snapshot.val();
    if (suppliers) {
      const supplierData = { id, ...suppliers };
      return res.status(200).json(supplierData);
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

const addSupplier = async (req, res) => {
  const data = req.body;
  try {
    const suppliersRef = await supplierService();
    const newSupplier = suppliersRef.push(data);
    res
      .status(201)
      .json({ message: "add data successfully", supplier_ID: newSupplier.key });
  } catch (e) {
    res.status(500).json({ message: "server error", e });
  }
};
const updateSupplierController = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const suppliersRef = await supplierByIdService(id);
    await suppliersRef.update(data);
    return res.status(200).json({ message: "Update data successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// delete a record
const deleteSupplierController = async (req, res) => {
  const id = req.params.id;
  try {
    const suppliersRef = await supplierByIdService(id);
    await suppliersRef.remove();
    return res.status(200).json({ message: "Delete data successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getSuppliers,
  addSupplier,
  deleteSupplierController,
  updateSupplierController,
  getSupplierById
};
