import userModel from "../models/user.model.js";

export default class User{


    getUser = async()=>{
         try {
        const users = await userModel.find()
        res.send({ result: 'success', payload: users })

             } catch (error) {
        console.log(error);
        res.send({result: 'error', error })

            }
      }


    InsertUser = async()=>{
         try {
         const result = await userModel.create(req.body)
         res.send({status: "success", payload: result})

             } catch (error) {
        console.log(error);
        res.send({result: 'error', error })

            }
      }


    updateUser = async(uid)=>{
        try{
        const uid = req.params.uid
        const userToReplace = req.body
        const result = await userModel.updateOne({_id: uid}, userToReplace)

    res.send({status: "success", payload: result})
        }catch(error){
            console.log(error)
            return null
        }
    }


    
    deleteUser = async(uid)=>{ 

        const result = await userModel.deleteOne({_id: uid})
        res.send({status: "success", payload: result})      
        if(result)
        res.send("User deleted")
        else
        return res.status(404).send('User to eliminate not found')
        }  
  

}