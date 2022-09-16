import { ContenedorArchivo } from "../../contenedores/contenedorArchivo.js";

class CarritoDaoArchivo extends ContenedorArchivo {
    constructor(){
        super('carrito.txt')
    }
}
export default CarritoDaoArchivo