import mongoose from 'mongoose'

const cartsCollection = 'carts'

const cartsSchema = new mongoose.Schema({
    products: {
        type: Array,
        default: []
    }    
})

mongoose.set("strictQuery", false);
const cartsModel = mongoose.model(cartsCollection, cartsSchema)

export default cartsModel
