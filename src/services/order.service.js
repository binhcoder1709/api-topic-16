import { database } from "../config/firebase.config.cjs";

const orderByIdService = (id) => {
  return database.ref(`orders/${id}`);
};

const orderService = async () => {
  return database.ref("orders");
};

export { orderByIdService, orderService };
