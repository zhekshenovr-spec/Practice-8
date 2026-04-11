import postModel from "../models1/postModel.js"

export default async function postDeletingMiddleware(req, res, next) {
    const userId = req.user?.id
    if (!userId) {
        return res.status(400).json({ message: "User not authorized" })
    }

    const post = await postModel.findById(req.params.id)
    if (!post) {
        return res.status(404).json({ message: "Post not found" })
    }

    const isAuthor = post.author.toString() === userId
    const isAdmin = String(req.user.role).toUpperCase() === "ADMIN"

    if (!isAuthor && !isAdmin) {
        return res.status(400).json({ message: "only author or admin can delete this post" })
    }

    req.post = post
    next()
}
