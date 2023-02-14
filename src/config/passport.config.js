import passport from "passport";
import UserModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from '../utils.js'
import GitHubStrategy from "passport-github2"

//Agregar estrategia de git

/*
 
App ID: 290922

Client ID: Iv1.43cec26d4b1c847d

83aba00509854b210e105c2662be559b80101fcf
 
 */
const initializePassport = () => {

    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.43cec26d4b1c847d",
        clientSecret: "83aba00509854b210e105c2662be559b80101fcf",
        callbackURL: "http://127.0.0.1:8080/api/session/githubcallback"
    }, async(accessToken, refreshToken, profile, done) => {
        console.log(profile);

        try {
            const user = await UserModel.findOne({email: profile._json.email})
            if(user) return done(null, user)

            const newUser = await UserModel.create({
                first_name: profile._json.name,
                last_name: "",
                email: profile._json.email,
                password: ""
            })

            return done(null, newUser)
        } catch (error) {
            return done('Error to login with github' + error)
        }
    }))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })

}

export default initializePassport;