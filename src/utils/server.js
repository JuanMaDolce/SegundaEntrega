import express from 'express'
import connectDB from './mongoDB.js'
import * as dotenv from 'dotenv'
import { daos,apiProductos,apiCarrito } from '../daos/index.js'

dotenv.config()

/* import ProductoDaoArchivo from '../daos/productos/ProductosDaoArchivo.js'
import CarritoDaoArchivo from '../daos/carrito/CarritoDaoArchivo.js'
import ProductosDaoMongoDB from '../daos/productos/ProductosDaoMongoDB.js'
import CarritoDaoMongoDB from '../daos/carrito/CarritoDaoMongoDB.js' */

daos()

connectDB()

const {Router} = express

const app = express()
const routerProductos = Router()
const routerCarrito = Router()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))


/* const dao = new ProductoDaoArchivo

const daoDos = new CarritoDaoArchivo

const productoMongo = new ProductosDaoMongoDB

const carritoMongo = new CarritoDaoMongoDB */

let admin = true

const permisos = (req, res, next) =>{
    if (admin){
        next()
    } else {
        res.send({
            error: '-1, descripción: ruta no autorizado'
        })
    }
}

// API PRODUCTOS

routerProductos.get('/', async (req,res) =>{
    const list = await apiProductos.getAll()
    res.json(list)
/*     const list = dao.getAll()
    const f = async () =>{
        res.json(await list)
    }
    f() */
})

routerProductos.get('/:id', async (req,res) =>{
    const {id} = req.params
    res.json( await apiProductos.getById(id))
        /* res.json(object.getById(Number(id))) */
})

routerProductos.post('/', permisos, async (req,res) =>{
    const {title,price,thumbnail} = req.body

    const product = await apiProductos.save(title,price,thumbnail)
    res.send(product)

/*     const product = object.save(title,price,thumbnail)
    res.send(product) */
})

routerProductos.put('/:id', permisos, async (req,res)=>{
    const {id} = req.params
    const {title,price,thumbnail} = req.body
    res.send( await apiProductos.upload(id,title,price,thumbnail))
    /* res.send( object.upload(Number(id),title,price,thumbnail)) */
})

routerProductos.delete('/:id', permisos, async (req,res)=>{
    const {id} = req.params
    res.send(await apiProductos.deleteById(id))
    /* res.send(object.deleteById(Number(id))) */
})

// API CARRITO

routerCarrito.get('/:id/productos', async (req,res) =>{
    const {id} = req.params
        res.json(await apiCarrito.getCartById(id))
})

routerCarrito.post('/', async (req,res) =>{
    const newCartAdd = await apiCarrito.saveCart()
    res.send(newCartAdd)

    /* const newCartAdd = daoDos.saveCart()
    res.send(newCartAdd) */
})

routerCarrito.delete('/:id', permisos, async (req,res)=>{
    const {id} = req.params
    res.send(await apiCarrito.deleteCartByID(id))
    /* res.send(daoDos.deleteCartByID(Number(id))) */
})

routerCarrito.delete('/:id/productos/:id_prod',permisos, async (req,res)=>{
    const {id,id_prod} = req.params
    res.send(await apiCarrito.deleteProductByID(id,id_prod))

    /* res.send(daoDos.deleteProductByID(Number(id),Number(id_prod))) */
}) 

routerCarrito.post('/:id/productos', async (req,res) =>{
    const {id} = req.params
    const productToCart = await apiCarrito.addProductToCart((id))
    res.json(productToCart)


    /* const productToCart = daoDos.addProductToCart(Number(id))
        res.json(productToCart) */
}) 

const PORT = process.env.PORT

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

app.listen(PORT, ()=>{
    console.log('server is running on port 8080')
})