import mongoose from 'mongoose'

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    products: {
        title: String,
        description: String,
        price: Number,
        code:Number,
        stock:Number,
        category:String,
        status:Boolean,
        default: []
    }    
})

mongoose.set("strictQuery", false);

const productsModel = mongoose.model(productsCollection, productsSchema)

export default productsModel