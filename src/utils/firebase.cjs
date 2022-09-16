var admin = require("firebase-admin");

var serviceAccount = require("../../nodejs-50b3a-firebase-adminsdk-ea0w5-5878cfc67d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

export default db




