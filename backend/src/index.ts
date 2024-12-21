import express from 'express'
import userRoute from './routes/index'
import mongoose, { mongo } from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
const app=express()
app.use(cors())
console.log(process.env.PORT)
console.log(process.env.MONGO_URL);
const dbconnect=async()=>{
    mongoose.connect(process.env.MONGO_URL || "").then(res=>{
        console.log("mongodb connected successfully")
    }).catch(err=>{
        console.log(err);
        console.log("failed to connect with db")
        process.exit(1);
    })
}

dbconnect()
app.use(express.json())
app.use('/api/v1',userRoute)

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`app is running at ${PORT}`)
})
app.get('/',()=>{
    console.log(`Easy peasy`)
})