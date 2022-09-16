import { ContenedorArchivo } from "../../contenedores/contenedorArchivo.js";

class ProductoDaoArchivo extends ContenedorArchivo {
    constructor(){
        super('productos.txt')
    }
}
export default ProductoDaoArchivo