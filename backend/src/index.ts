import express from 'express'
import userRoute from './routes/index'
import mongoose, { mongo } from 'mongoose'
const app=express()
const dbconnect=async()=>{
    mongoose.connect(process.env.MONOGO_URL || "").then(res=>{
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


app.get('/',()=>{
    console.log(`app is working at ${PORT} port`)
})