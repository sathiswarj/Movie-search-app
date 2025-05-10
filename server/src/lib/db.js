import mongoose from 'mongoose'

export const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        if(conn){
            console.log('Database connected')
        }
    } catch (error) {
        console.log("Error connecting to database", error)
    }
}