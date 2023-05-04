import dotenv from 'dotenv'


dotenv.config()

export default {
        port: process.env.PORT,    
        mongoUrl:process.env.MONGO_URL,
        dbName:process.env.DB_NAME,
        secret:process.env.SECRET,
        persistence: process.env.PERSISTENCE,
        jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
        jwtCookieName: process.env.JWT_COOKIE_NAME,
        test_mongo_uri: process.env.TEST_MONGO_URI
}


 