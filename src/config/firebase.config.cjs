var admin = require("firebase-admin");

var serviceAccount = require("./dbKey/dbKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://clock-shop-2e5a9-default-rtdb.firebaseio.com"
});


const database = admin.database();

module.exports = {database}
