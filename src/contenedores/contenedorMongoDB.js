import mongoose from "mongoose"
import Productos from "../utils/productosModule.js"
import Carrito from "../utils/carritoModule.js"

const arrayProductos = []

class ContenedorMongoDB{

    getAll = async () => {
        try{
            let productos = Productos.find()
            return productos
        }
        catch (err){
            return err
        }
    }

    save = async (title,price,thumbnail) =>{
        let product = new Productos({
            title,
            price,
            thumbnail
        })
        try{
            await product.save()
            return product
        } catch (error) {
            console.log(error.messege)
        }
    }

    getById = async (id) => {        
        try{
            let product = await Productos.findById(id)
            return product
        } catch (err){
            console.log(err)
        }
    }

    upload = async (id,title,price,thumbnail) => {
        try{
            let product = await Productos.findByIdAndUpdate(id, {title: title, price: price, thumbnail: thumbnail})
            return product
        } catch (err){
            console.log(err)
        }
    }

    deleteById = async (id) => {
            try{
                await Productos.findByIdAndDelete(id)
                let res = {mensaje: `Producto ${id} eliminado`}
                return res
            } catch (err) {
                console.log(err)
            }
        }

        getCartById = async (id) => {
            try{
                let findCart = await Carrito.findById(id)

                if (findCart){

                    return findCart
                } else {
                    const error = {error: 'ID de carrito inexistente' }
                    return error
                }
            } catch (err){
                console.log(err)
            }
        }

    saveCart = async () => {
        let carrito = new Carrito()
        try{
            await carrito.save()
            return carrito
        } catch (error) {
            console.log(error.messege)
        } 
    }

    deleteCartByID = async (id) => {
        try{
            await Carrito.findByIdAndDelete(id)
            let res = {mensaje: `Carrito ${id} eliminado`}
            return res
        } catch (err) {
            console.log(err)
        }
    }

    addProductToCart = async (id) => {
        try{
            const cartFind = await Carrito.find()

            const product = await Productos.findById(id)

            arrayProductos.push(product)

            if(cartFind.length && product){

                cartFind[0].productos = arrayProductos

                await cartFind[0].save()
                
                return cartFind[0]

            } else if (product){
                let carrito = new Carrito({
                    productos: arrayProductos
                })
                await carrito.save()
                return carrito
            }  else {
                const error = 'ID producto inexistente'
                return error
            }
        } catch (err){
            console.log(err)
        }
    }

    deleteProductByID = async (id,id_prod) => {
        
        const cartFind = await Carrito.findById(id)

        if(cartFind){

            const products = await cartFind.productos

            const newCart =  await Carrito.findByIdAndUpdate(id, {productos: products.filter(p => p._id != id_prod)})

            return newCart

        } else{
            const error = {error: 'ID de producto inexistente' }
            return error 
        } 
    } 
}
export default ContenedorMongoDB
