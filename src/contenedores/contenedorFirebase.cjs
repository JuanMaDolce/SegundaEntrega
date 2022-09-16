var admin = require("firebase-admin");

var serviceAccount = require("../../nodejs-50b3a-firebase-adminsdk-ea0w5-5878cfc67d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore()

const query = db.collection('Productos')
class ContenedorFirebase {

        getAll = async () =>{
            try{
            const queryRead = await query.get()
            const respuesta = queryRead.docs.map(document => ({id: document.id, ...document.data()}))
            return respuesta
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = {ContenedorFirebase}