import CarritoDaoArchivo from "./carrito/CarritoDaoArchivo.js";
import CarritoDaoMongoDB from "./carrito/CarritoDaoMongoDB.js";
import ProductoDaoArchivo from "./productos/ProductosDaoArchivo.js";
import ProductosDaoMongoDB from "./productos/ProductosDaoMongoDB.js";


export let apiProductos = 0
export let apiCarrito = 0


export const daos = async () => {
    const dao = process.env.DAOS

    switch (dao) {
        case 'mongoDB':
            apiProductos = new ProductosDaoMongoDB
            apiCarrito = new CarritoDaoMongoDB
        break;
        case 'txt':
            apiProductos = new ProductoDaoArchivo
            apiCarrito = CarritoDaoArchivo
        break;
    }
}

