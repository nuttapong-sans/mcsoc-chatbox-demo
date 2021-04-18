var admin = require("firebase-admin");

var serviceAccount = require("./mcsoc-chatbox-demo-firebase-adminsdk-ju2wy-f19a6af402.json");

!admin.apps.length ? 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mcsoc-chatbox-demo-default-rtdb.firebaseio.com"
}) : ''

const db = admin.database()

module.exports = {db}