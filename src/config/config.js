import dotenv from 'dotenv'


dotenv.config()

export default {
port: process.env.PORT,    
mongoUrl:process.env.MONGO_URL,
dbName:process.env.DB_NAME,
secret:process.env.SECRET,

}


 