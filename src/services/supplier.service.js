import { database } from "../config/firebase.config.cjs";

const supplierByIdService = (id) => {
  return database.ref(`suppliers/${id}`);
};

const supplierService = async () => {
  return database.ref("suppliers");
};

export { supplierByIdService, supplierService };
