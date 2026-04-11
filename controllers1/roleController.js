import roleModel from "../models1/roleModel.js"
class roleController {
    async createRoles(req, res){
        try{
            const user = new roleModel()
            const admin = new roleModel({value: "ADMIN"})
            await user.save()
            await admin.save()
            res.json({message: "roles created successfully"})
        }
        catch(e){
            console.log(e)
            res.status(400).json({message: "error in create roles"})
        }
    }
}

export default new roleController()