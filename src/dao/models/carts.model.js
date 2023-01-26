import mongoose from 'mongoose'

const cartsCollection = 'carts'

const cartsSchema = new mongoose.Schema({
    products: {
         type:[{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity:Number,
          }],
    default: []
    },
})

mongoose.set("strictQuery", false);
const cartsModel = mongoose.model(cartsCollection, cartsSchema)

export default cartsModel
