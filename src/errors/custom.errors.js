export default class CustomError {
    static async createError ({name= "Error", cause, message, code}){
        const error = new Error(message, {cause})
        error.name = name
        error.code = code
        throw error
    }
}