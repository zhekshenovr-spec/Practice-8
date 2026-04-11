import { Router } from "express"
import postController from "./Controllers/postController.js"
import authController from "./Controllers/authController.js"
import roleController from "./Controllers/roleController.js"
import authMiddleware from "./middleware/authMiddleware.js"
import postUpdatingMiddleware from "./middleware/postUpdatingMiddleware.js"
import postDeletingMiddleware from "./middleware/postDeletingMiddleware.js"

const router = Router()

router.get("/test", (req, res) => {
    res.json({message: "Hello World!"})
})

router.get("/post/all", postController.getAllPosts) // get all posts
router.get("/post/one/:id", postController.getPostById) // get post by id
router.post("/post", authMiddleware, postController.createPost) // create post
router.put("/post/:id", authMiddleware, postUpdatingMiddleware, postController.updatePost) // update post by id
router.delete("/post/:id", authMiddleware, postDeletingMiddleware, postController.deletePost) // delete post by id
router.post("/auth/register", authController.register) // register user
router.post("/auth/login", authController.login) // login user
router.get("/role/create", roleController.createRoles) // create roles

export default router