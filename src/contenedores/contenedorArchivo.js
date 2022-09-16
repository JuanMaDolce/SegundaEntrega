import fs from "fs"

let timestamp = new Date()

let time = new Date()

const arrayProducts = []


export class ContenedorArchivo {

    getAll(){
        let dataFile = fs.readFileSync("../DB/productos.txt", "utf-8")
        let dataFileParse = JSON.parse(dataFile) 
        try{
            return dataFileParse
        }
        catch (err){
            return err
        }
    }
    
    save(title,price,thumbnail){
        let dataFile = fs.readFileSync("../DB/productos.txt", "utf-8")
        let dataFileParse = JSON.parse(dataFile) 
        let newProduct = {
            title,
            price,
            thumbnail,
            timestamp: timestamp.toLocaleString(),
            stock: 1
        }            
        if(dataFileParse.length){
            let id = dataFileParse[dataFileParse.length - 1].id + 1
            fs.writeFileSync("../DB/productos.txt", JSON.stringify([...dataFileParse, {...newProduct, id: id}], null, 2))
            const rta ={
                newProduct,
                id
            }
            return rta
        } else {
            fs.writeFileSync("../DB/productos.txt", JSON.stringify([...dataFileParse, {...newProduct, id: 1}], null, 2))
            const rta2 ={
                newProduct,
                id: 1
            }
            return rta2
        } 
    }
    getById(id) {
        let dataFile = fs.readFileSync("../DB/productos.txt", "utf-8")
        let dataFileParse = JSON.parse(dataFile) 
        try{
            if (dataFileParse.find( p => p.id === id)){
                const product = dataFileParse.find( p => p.id === id);
                return product
            } else {
                const error = {error: 'ID de producto inexistente' }
                return error
            }
        } catch (err){
            console.log(err)
        }
    }
    upload(id,title,price,thumbnail){
        let dataFile = fs.readFileSync("../DB/productos.txt", "utf-8")
        let dataFileParse = JSON.parse(dataFile)
            if (dataFileParse.find( p => p.id === id)){
                const newProduct = {
                    title,
                    price,
                    thumbnail,
                    id
                }
                const newArray = dataFileParse.filter(p => p.id !== id)
                newArray.unshift(newProduct)
                fs.writeFileSync("../DB/productos.txt", JSON.stringify(newArray, null, 2))
                const productUploades = {
                    message: 'Producto modificado',
                    newProduct
                }
                return productUploades
            } else{
                const error = {error: 'ID de producto inexistente' }
                return error
            } 
        }
    deleteById(id){
        let dataFile = fs.readFileSync("../DB/productos.txt", "utf-8")
        let dataFileParse = JSON.parse(dataFile)
            try{
                if ((dataFileParse.find(p => p.id === id))){
                    const newArray = dataFileParse.filter(p => p.id !== id)
                    fs.writeFileSync("../DB/productos.txt", JSON.stringify(newArray, null, 2))
                    const supr = `Producto ID ${id} eliminado`
                    return supr
                    
                } else {
                    const error = 'ID de producto inexistente'
                    return error
                }
            } catch (err) {
                console.log(err)
            }
        }
        getCartById(id){
            let cartFile = fs.readFileSync("../DB/carrito.txt", "utf-8")
            let cartFileParse = JSON.parse(cartFile) 
            try{
                if (cartFileParse.find( c => c.id === id)){
                    const cart = cartFileParse.find( c => c.id === id);
                    return cart
                } else {
                    const error = {error: 'ID de carrito inexistente' }
                    return error
                }
            } catch (err){
                console.log(err)
            }
        }
        saveCart(){
            let cartFile = fs.readFileSync("../DB/carrito.txt", "utf-8")
            let cartFileParse = JSON.parse(cartFile) 
            let newCart = {
                timestamp: time.toLocaleString()
            }            
            if(cartFileParse.length){
                let id = cartFileParse[cartFileParse.length - 1].id + 1
                fs.writeFileSync("../DB/carrito.txt", JSON.stringify([...cartFileParse, {...newCart, id: id}], null, 2))
                const rta = {
                    newCart,
                    id
                }
                return rta
            } else {
                fs.writeFileSync("../DB/carrito.txt", JSON.stringify([...cartFileParse, {...newCart, id: 1}], null, 2))
                const rta2 = {
                    newCart,
                    id: 1
                }
                return rta2
            }  
        } 
        deleteCartByID(id){
            let cartFile = fs.readFileSync("../DB/carrito.txt", "utf-8")
            let cartFileParse = JSON.parse(cartFile) 
                try{
                    if ((cartFileParse.find(c => c.id === id))){
                        const newArray = cartFileParse.filter(c => c.id !== id)
                        fs.writeFileSync("../DB/carrito.txt", JSON.stringify(newArray, null, 2))
                        const supr = `Carrito ID ${id} eliminado`
                        return supr
                        
                    } else {
                        const error = 'ID de Carrito es inexistente'
                        return error
                    }
                } catch (err) {
                    console.log(err)
                }
            }
            deleteProductByID(id,id_prod){
                let cartFile = fs.readFileSync("../DB/carrito.txt", "utf-8")
                let cartFileParse = JSON.parse(cartFile)
    
                    if (cartFileParse.find(c => c.id === id)){
    
                        const cart = cartFileParse.find( c => c.id === id)
                        
                        const cartProducts = cartFileParse.find( c => c.id === id).product
    
                        let newProducts = cartProducts.filter(p=>p.id !== id_prod)
    
                        const newCart = {
                            timestamp: cart.timestamp,
                            id: cart.id,
                            product: newProducts                        
                        }
    
                        const newArray = cartFileParse.filter(c => c.id !== id)
    
                        newArray.unshift(newCart)
                        fs.writeFileSync("../DB/carrito.txt", JSON.stringify(newArray, null, 2))
                        const cartUpload = {
                            message: 'Producto modificado',
                            newCart
                        }
                        return cartUpload
                    } else{
                        const error = {error: 'ID de producto inexistente' }
                        return error 
                    } 
                } 
            addProductToCart(id){
                let cartFile = fs.readFileSync("../DB/carrito.txt", "utf-8")
                let cartFileParse = JSON.parse(cartFile)
                let dataFile = fs.readFileSync("../DB/carrito.txt", "utf-8")
                let dataFileParse = JSON.parse(dataFile)
    
                let product = dataFileParse.find( c => c.id === id);
                
                const carrito = cartFileParse[0]
    
                arrayProducts.push(product)
    
                const productToCart = {
                    message: 'Producto agregado al carrito',
                    product
                }
                if(cartFileParse.length && dataFileParse.find(p => p.id === id)){
                    let cart = {
                        timestamp: carrito.timestamp,
                        id: carrito.id,
                        product: [...carrito.product, product]
                    }   
                    fs.writeFileSync("../DB/carrito.txt", JSON.stringify([cart], null, 2))
                    return productToCart
                } else if (dataFileParse.find(p => p.id === id)){
                    let newCart = {
                        timestamp: time.toLocaleString(),
                        id: 1,
                        product: arrayProducts
                    }
                    fs.writeFileSync("../DB/carrito.txt", JSON.stringify([newCart], null, 2))
                    return productToCart
                }  else {
                    const error = 'ID producto inexistente'
                    return error
                }
            } 
    }

