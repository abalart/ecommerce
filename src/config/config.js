import dotenv from 'dotnet'


dotenv.config()

export default {
    mongoUrl: process.env.MONGO_URL,
    PORT: process.env.PORT

}