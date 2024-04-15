import {
  productByIdService,
  productService,
} from "../services/product.service.js";

const getProducts = async (req, res) => {
  const productsRef = await productService();
  productsRef.once("value", (snapshot) => {
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
const addProduct = async (req, res) => {
  const data = req.body;
  try {
    const suppliersRef = await productService();
    const newSupplier = suppliersRef.push(data);
    res
      .status(201)
      .json({ message: "add data successfully", product_ID: newSupplier.key });
  } catch (e) {
    res.status(500).json({ message: "server error", e });
  }
};
const updateProductController = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const suppliersRef = await productByIdService(id);
    await suppliersRef.update(data);
    return res.status(200).json({ message: "Update data successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// delete a record
const deleteProductController = async (req, res) => {
  const id = req.params.id;
  try {
    const suppliersRef = await productByIdService(id);
    await suppliersRef.remove();
    return res.status(200).json({ message: "Delete data successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getProducts,
  addProduct,
  deleteProductController,
  updateProductController,
};
