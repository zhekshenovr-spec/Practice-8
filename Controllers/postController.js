import postModel from "../Models/postModel.js"

class postController {
    async getAllPosts(req, res){
        try{
            const posts = await postModel.find()
            res.json(posts)
        }
        catch(e){
             console.log(e);
            res.status(400).json({message:"error in getAllPosts"})
        }
    }
    async getPostById(req, res){
        try{
            const post = await postModel.findById(req.params.id)
            res.json(post)
        }
        catch(e){
             console.log(e);
            res.status(400).json({message:"error in getPostById"})
        }
    }
    async createPost(req, res){
        try{
            const {title, description} = req.body
            const author = req.user?.id
            if (!author) {
                return res.status(401).json({message: "User not authorized"})
            }
            const post = await postModel.create({title, description, author})
            res.json(post)
        }
        catch(e){
             console.log(e);
            res.status(400).json({message:"error in createPost"})
        }
    }
    async deletePost(req, res){
        try{
            const post = req.post
            if (!post) {
                return res.status(404).json({message: "Post not found"})
            }
            await postModel.findByIdAndDelete(post._id)
            res.json({message: "Post deleted successfully"})
        }
        catch(e){
             console.log(e);
            res.status(400).json({message:"error in deletePost"})
        }
    }
    async updatePost(req, res){
        try{
            const post = req.post
            if (!post) {
                return res.status(404).json({message: "Post not found"})
            }
            const {title, description} = req.body
            post.title = title || post.title
            post.description = description || post.description
            await post.save()
            res.json(post)
        }
        catch(e){
             console.log(e);
            res.status(400).json({message:"error in updatePost"})
        }
    }
}

export default new postController()