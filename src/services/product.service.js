import { database } from "../config/firebase.config.cjs";

const productByIdService = (id) => {
  return database.ref(`products/${id}`);
};

const productService = async () => {
  return database.ref("products");
};

export { productByIdService, productService };
