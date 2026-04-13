import { Router } from "express"
import postController from "./controllers1/postController.js"
import authController from "./controllers1/authController.js"
import roleController from "./controllers1/roleController.js"
import authMiddleware from "./middlewares1/authMiddleware.js"
import postUpdatingMiddleware from "./middlewares1/postUpdatingMiddleware.js"
import postDeletingMiddleware from "./middlewares1/postDeletingMiddleware.js"

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