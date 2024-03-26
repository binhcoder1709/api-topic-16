import {database} from "../config/firebase.config.cjs";

// generate user service
const userService = () => {
    return database.ref("users")
}

// id user service
const userByIdService = (id) => {
    return database.ref(`users/${id}`)
}

export {userService, userByIdService}

