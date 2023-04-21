import UserDTO from '../dao/DTO/users.dto.js'


export default class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    get = async() => {
        return await this.dao.get()
    }

    getOneByID = async(id) => {
        return await this.dao.getOneByID(id)
    }

    getOneByEmail = async(email) => {
        return await this.dao.getOneByEmail(email)
    }

    create = async(data) => {
        const dataToInsert = new UserDTO(data)
        return await this.dao.create(dataToInsert)
    }

    emailSender = async(userID) => { 
        const user = await  this.dao.getById(userID)
        let html = `<h1> Recuperar password!</h1>
        <a href="http://stackoverflow.com"><button>Recuperar</button></a>`

     } 
}

