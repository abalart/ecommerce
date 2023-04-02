export default class CartDTO {
//Dao a enviar al patron repository
    constructor(cart) {
        this.id = cart.id || cart._id || null
        this.products = cart.products || []
    }

}