import { orderByIdService, orderService } from "../services/order.service.js";

const getOrders = async (req, res) => {
  const ordersRef = await orderService();
  ordersRef.once("value", (snapshot) => {
    const orders = snapshot.val();
    let ordersArray = [];
    if (orders) {
      ordersArray = Object.keys(orders).map((item) => ({
        id: item,
        ...orders[item],
      }));
      return res.status(200).json(ordersArray);
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

const createOrder = async (req, res)=>
{
    const data = req.body;
    try {
      const ordersRef = await orderService();
      const newOrder = ordersRef.push(data);
      res
        .status(201)
        .json({ message: "add data successfully", order_ID: newOrder.key });
    } catch (e) {
      res.status(500).json({ message: "server error", e });
    }
}

const deleteOrder = async (req, res)=>
{
    const id = req.params.id;
    try {
        const ordersRef = await orderByIdService(id);
        await ordersRef.remove();
        return res.status(200).json({ message: "Delete data successfully" });
      } catch (e) {
        return res.status(500).json({ message: "Internal server error" });
      }
}

export { getOrders, createOrder, deleteOrder };
