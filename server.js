import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './router.js'


dotenv.config()


const app = express()
app.use(express.json())
app.use("/api", router)

async function startServer() {
    const DB_URL = process.env.DB_URL
    const PORT = process.env.PORT || 3000
    try{
        await mongoose.connect(DB_URL) // 1. ввод url 2. запрос 3. подключение 4. return
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    }
    catch(e){
        throw new Error(e)  
    }
    
}

startServer()