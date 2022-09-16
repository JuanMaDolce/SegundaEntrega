import db from "../utils/firebase.cjs"

const CRUD = async ()=>{

    query = db.collection('usuarios')

    ////// create 
    try {
         let id = 2
         const doc = query.doc(`${id}`)
        await doc.create({
             nombre: 'jose2',
            apellido: 'perez',
         edad: 20,
            email: 'j@gamil.com'
        })
        console.log('usuario creado')

        /////// update
        // const id = '2'
        // const doc = query.doc(id)
        // const item = await doc.update({
        //     nombre: 'jose 2',
        //     edad: 30
        // })

        /////// delete
        // id = '2'
        //     const doc = query.doc(id)
        //     const item = await doc.delete()
        //     console.log(`Item eliminado: ${item}`)

        //// leer todos los documentos
        // const queryRead = await query.get()
        // const respuesta = queryRead.docs.map(document => ({id: document.id, ...document.data()}))
        // console.log(respuesta)
        // let docs = 

        /* const doc = query.doc('1')
        let queryReadONE = await doc.get()
        // console.log(queryReadONE)
        const respuesta = {id: queryReadONE.id, ...queryReadONE.data()}
        console.log(respuesta) */

    } catch (error) {
        console.log(error)
    }


}

CRUD()
