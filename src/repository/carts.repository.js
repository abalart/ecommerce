/*La capa de repositorios o servicios cumple la funcion de añadir un nivel extra de abstracción para dejar cada vez más limpio 
y entendible el negocio. La idea es que solo se llame a los metodos del dao*/

import CartDTO from '../DAO/DTO/carts.dto.js'

export default class CartRepository {
    constructor(dao) { //Recibimos el dao a utilizar
        this.dao = dao
    }

    get = async() => {
        return await this.dao.get()
    }

    create = async(data) => {
        const dataToInsert = new CartDTO(data)
        return await this.dao.create(dataToInsert)
    }

    getById = async (id) => {
        return await this.dao.getById(id)
    }

    getByIdLean = async (id) => {
        return await this.dao.getByIdLean(id)
    }
}