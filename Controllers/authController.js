import userModel from "../Models/userModel.js"
import roleModel from "../Models/roleModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

function generateToken(id, role){
    const payload = {id, role}
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1h"})
}

class authController {
    async register(req, res) {
        try{
            const {username, password} = req.body
            const uqUser = await userModel.findOne({username})
            if(uqUser){
                return res.status(400).json({message: "that user is already exist"})
            }
            const hashPassword = bcrypt.hashSync(password, 3)
            const userRole = await roleModel.findOne({value: "USER"})
            const user = new userModel({username, password: hashPassword, role: userRole.value})
            await user.save()
            res.json(user)
        }
        catch(e){
            console.log(e)
            res.status(400).json({message: "error in register"})
        }
    }
    async login(req, res) {
        try{
            const {username, password} = req.body
            const targetUser = await userModel.findOne({username})
            if(!targetUser){
                return res.status(400).json({message: "that user is not exist"})
            }
            const validPassword = bcrypt.compareSync(password, targetUser.password)
            if(!validPassword){
                return res.status(400).json({message: "invalid password"})
            }
            const token = generateToken(targetUser._id, targetUser.role)
            res.json({message: `login successful, token: ${token}`})
        }
        catch(e){
            console.log(e)
            res.status(400).json({message: "error in login"})
        }
    }
}

export default new authController()