import mongoose from 'mongoose'

const messagesCollection = 'messages'

const messagesSchema = new mongoose.Schema({
    message: String
})

mongoose.set("strictQuery", false);

const messagesModel = mongoose.model(messagesCollection, messagesSchema)

export default messagesModel
