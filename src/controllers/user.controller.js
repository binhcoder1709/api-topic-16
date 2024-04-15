import { userByIdService, userService } from "../services/user.service.js";
import { checkEmpty } from "../middlewares/user.middleware.js";

// get data from users collection
const getUsersController = async (req, res) => {
  const usersRef = await userService();
  usersRef.once(
    "value",
    (snapshot) => {
      const users = snapshot.val();
      const checkUsers = checkEmpty(users);
      if (!checkUsers) {
        res.status(404).json({ message: "data not found" });
      }
      // Convert the users object to an array
      // Convert the users object to an array
      let usersArray = [];
      if (users) {
        usersArray = Object.keys(users).map((key) => ({
          id: key,
          ...users[key],
        }));
      } else {
        res.status(404).json({ message: "data not found" });
      }

      // Return the users array as JSON response
      res.status(200).json(usersArray);
    },
    (error) => {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  );
};

// get user by id
const getUserByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const usersRef = await userByIdService(id);
    const snapshot = await usersRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = snapshot.val();
    const userData = { id, ...user };

    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Failed to fetch user" });
  }
};

// post record to users collection
const addUserController = async (req, res) => {
  const data = req.body;
  try {
    const usersRef = await userService();
    const newUser = usersRef.push(data);
    res
      .status(201)
      .json({ message: "add data successfully", user_ID: newUser.key });
  } catch (e) {
    res.status(500).json({ message: "server error", e });
  }
};

// change status field of users collection
const changeStatusController = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const usersRef = await userByIdService(id);
    await usersRef.update({ status });
    return res.status(200).json({ message: "Update status successfully" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// update field data of users collection
const updateDataController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const usersRef = await userByIdService(id);
    await usersRef.update(data);
    return res.status(200).json({ message: "Update data successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// delete a record
const deleteUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const usersRef = await userByIdService(id);
    await usersRef.remove();
    return res.status(200).json({ message: "Delete user successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getUsersController,
  addUserController,
  changeStatusController,
  updateDataController,
  getUserByIdController,
  deleteUserController,
};
